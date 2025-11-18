let searchResult = {};
let favVideos = [];

let searchForm = document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    movieSearch();
});     
let viewFavsBtn = document.querySelector('#view-favorites').addEventListener('click', displayFavVids);

const API_KEY = 'AIzaSyB2rWQrF77oKwMyhHuLGx09K5mltiif-N4';
const maxResults = 10;

async function movieSearch() {
    try {
        let searchInput = document.querySelector('#movie-search').value;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchInput)}&maxResults=${maxResults}&order=relevance&type=video&videoDuration=medium&key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw Error('The film API cannot be accessed at this time. Here is a status message: ', response.statusText);
        }
        const json = await response.json();
        console.log(json);
        if (json.items) {
            json.items.forEach(item => {
                console.log(`Title: ${item.snippet.title}`);
                console.log(`Channel: ${item.snippet.channelTitle}`);
                console.log(`Video ID: ${item.id.videoId}`);
                console.log(`Video Link: https://www.youtube.com/watch?v=${item.id.videoId}`)
                console.log(`Thumbnail: ${item.snippet.thumbnails.high.url}`)
                console.log('---');
            });
            displayResult(json.items);
        }
        else {
            displayMovieNotFound();
        }
    }
    catch (err) {
        console.log(err);
        alert('Failed to retrieve YouTube data');
    }
}

function displayResult(results) {
    const favMoviesDiv = document.querySelector('#display-favorites');
    const movieNotFound = document.querySelector('.movie-not-found');
    favMoviesDiv.style.display = 'none';
    movieNotFound.style.display = 'none';

    const videosContainer = document.querySelector('.search-result');
    videosContainer.innerHTML = '';
    videosContainer.style.display = 'flex';

    const header = document.createElement('h2');
    header.textContent = 'Click on Video Title to Watch!';
    videosContainer.appendChild(header);

    results.forEach(result => {
        const videoId = result.id.videoId;
        const title = result.snippet.title;
        const channel = result.snippet.channelTitle;
        const thumbnail = result.snippet.thumbnails.high.url;
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        const description = result.snippet.description;

        // making the div to store the result
        const card = document.createElement('div');
        card.classList.add('result-card');
        
        // making img elemnt
        const img = document.createElement('img');
        img.src = thumbnail;
        img.alt = title;
        img.classList.add('result-thumbnail');

        // making a div to store all other info
        const vidInfo = document.createElement('div');
        vidInfo.classList.add('result-info');

        // making another div for a video header (has the title and fav button)
        const vidHeader = document.createElement('div');
        vidHeader.classList.add('result-header');

        // making the h3 to store the video title
        const vidTitle = document.createElement('a');
        vidTitle.href = url;
        vidTitle.textContent = title;
        vidTitle.classList.add('result-title');

        favVideos = JSON.parse(localStorage.getItem('favVideos')) || [];
        const favBtn = document.createElement('button');
        favBtn.classList.add('favorite-button');
        if (!!favVideos.find(v => v.videoId === videoId)) {
            favBtn.textContent = 'Remove from Favorites';
        }
        else {
            favBtn.textContent = 'Add to Favorites';
        }
        favBtn.addEventListener('click', () => toggleFavorite(result, favBtn));

        // add the title and fav button to the div
        vidHeader.appendChild(vidTitle);
        vidHeader.appendChild(favBtn);

        // making p to store video channel name
        const vidChannel = document.createElement('p');
        vidChannel.textContent = channel;
        vidChannel.classList.add('result-channel');

        const vidDescription = document.createElement('p');
        vidDescription.textContent = description;

        card.appendChild(img);
        vidInfo.appendChild(vidHeader);
        vidInfo.appendChild(vidChannel);
        vidInfo.appendChild(vidDescription);
        card.appendChild(vidInfo);

        videosContainer.appendChild(card);
    });
}

function displayMovieNotFound() {
    const resultArea = document.querySelector('.search-result');
    const favMoviesDiv = document.querySelector('#display-favorites');
    const movieNotFound = document.querySelector('.movie-not-found');

    resultArea.style.display = 'none';
    favMoviesDiv.style.display = 'none';
    movieNotFound.style.display = 'flex';
}

// adds/removes video from favorites and then changes text content of the button
function toggleFavorite(currentVid, favBtn) {
    let videos = JSON.parse(localStorage.getItem('favVideos')) || [];

    // if video is not in list, then add, otherwise delete from list
    if (!videos.find(video => video.videoId === currentVid.id.videoId)) {
        videos.push({
            videoId: currentVid.id.videoId,
            title: currentVid.snippet.title,
            channel: currentVid.snippet.channelTitle,
            thumbnail: currentVid.snippet.thumbnails.high.url,
            url: `https://www.youtube.com/watch?v=${currentVid.id.videoId}`
        });
        favBtn.textContent = 'Remove from Favorites';
    }
    else {
        videos = videos.filter(video => video.videoId != currentVid.videoId);
        favBtn.textContent = 'Add to Favorites';
    }
    localStorage.setItem('favVideos', JSON.stringify(videos));
}

function removeFavorite(videoId) {
    let videos = JSON.parse(localStorage.getItem('favVideos')) || [];
    videos = videos.filter(video => video.videoId != videoId);
    localStorage.setItem('favVideos', JSON.stringify(videos));
    displayFavVids();
}

function displayFavVids() {
    const resultArea = document.querySelector('.search-result');
    const movieNotFound = document.querySelector('.movie-not-found');

    movieNotFound.style.display = 'none';
    resultArea.style.display = 'none';

    const container = document.querySelector('#display-favorites');
    container.innerHTML = ''; // empty existing content
    container.style.display = 'flex';

    const videos = JSON.parse(localStorage.getItem('favVideos')) || [];

    const favTitle = document.createElement('h2');
    favTitle.textContent = 'Favorites';
    favTitle.className = 'fav-section-title';

    container.appendChild(favTitle);

    videos.forEach(video => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'fav-card-div';
        cardDiv.tabIndex = 0;
        
        const img = document.createElement('img');
        img.src = video.thumbnail;
        img.alt = video.title;
        img.className = 'fav-img';

        const title = document.createElement('a');
        title.textContent = video.title;
        title.className = 'fav-title';
        title.href = video.url;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeFavorite(video.videoId));

        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(removeBtn);

        container.appendChild(cardDiv);
    });
}