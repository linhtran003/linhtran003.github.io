let searchResult = {
    title: '',
    releaseDate: '',
    rated: '',
    runtime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    posterURL: ''
}

let searchBtn = document.querySelector('#search-btn').addEventListener('click', movieSearch);
let viewFavsBtn = document.querySelector('#view-favorites').addEventListener('click', displayFavMovies);
let addFavBtn = document.querySelector('#favorite').addEventListener('click', toggleFavorite);

const endpoint = 'https://www.omdbapi.com/?i=tt3896198&apikey=36147126&t=the+proposal';
const baseEndpointURL = 'https://www.omdbapi.com/?i=tt3896198&apikey=36147126&t=';
const fullPlot = '&plot=full';

async function movieSearch() {
    try {
        let searchInput = document.querySelector('#movie-search').value;
        let formattedSearchInput = searchInput.replace(/ /g, "+"); // replaces all spaces with a plus
        let fullAPICall = baseEndpointURL + formattedSearchInput + fullPlot;
        const response = await fetch(fullAPICall);
        if (!response.ok) {
            throw Error('The film API cannot be accessed at this time. Here is a status message: ', response.statusText);
        }
        const json = await response.json();
        console.log(json);
        searchResult.title = json.Title;
        searchResult.releaseDate = json.Released;
        searchResult.rated = json.Rated;
        searchResult.runtime = json.Runtime;
        searchResult.genre = json.Genre;
        searchResult.director = json.Director;
        searchResult.writer = json.Writer;
        searchResult.actors = json.Actors;
        searchResult.plot = json.Plot;
        searchResult.posterURL = json.Poster;

        displayResult();
    }
    catch (err) {
        console.log(err);
        alert('failed to get new trivia');
    }
}

function displayResult() {
    const favMoviesDiv = document.querySelector('#display-favorites');
    const resultArea = document.querySelector('.search-result');
    const img = document.querySelector('#search-result-img');
    const title = document.querySelector('#title');
    const release = document.querySelector('#release');
    const rated = document.querySelector('#rated');
    const runtime = document.querySelector('#runtime');
    const genre = document.querySelector('#genre');
    const director = document.querySelector('#director');
    const writer = document.querySelector('#writer');
    const actors = document.querySelector('#actors');
    const plot = document.querySelector('#plot');

    favMoviesDiv.style.display = 'none';
    resultArea.style.display = 'flex';

    const addFavBtn = document.querySelector('#favorite');
    let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];
    if (!!favMovies.find(movie => movie.title === searchResult.title)) {
        addFavBtn.textContent = 'Remove from Favorites';
    }
    else {
        addFavBtn.textContext = 'Add to Favorites';
    }

    img.src = searchResult.posterURL;
    img.alt = searchResult.title;
    title.textContent = searchResult.title;
    release.textContent = searchResult.releaseDate;
    rated.textContent = searchResult.rated;
    runtime.textContent = searchResult.runtime;
    genre.textContent = searchResult.genre;
    director.textContent = searchResult.director;
    writer.textContent = searchResult.writer;
    actors.textContent = searchResult.actors;
    plot.textContent = searchResult.plot;
}

function toggleFavorite() {
    let movies = JSON.parse(localStorage.getItem('favMovies')) || [];

    // if movie is not in list, then add, otherwise delete from list
    if (!movies.find(movie => movie.title === searchResult.title)) {
        movies.push(searchResult);      
    }
    else {
        movies = movies.filter(movie => movie.title != searchResult.title);
    }
    localStorage.setItem('favMovies', JSON.stringify(movies));
}

function removeFavorite(movieTitle) {
    let movies = JSON.parse(localStorage.getItem('favMovies')) || [];
    movies = movies.filter(movie => movie.title != movieTitle);
    localStorage.setItem('favMovies', JSON.stringify(movies));
    displayFavMovies();
}

function displayFavMovies() {
    const resultArea = document.querySelector('.search-result');
    resultArea.style.display = 'none';

    const container = document.querySelector('#display-favorites');
    container.innerHTML = ''; // empty existing content
    container.style.display = 'flex';

    const movies = JSON.parse(localStorage.getItem('favMovies')) || [];
    const favTitle = document.createElement('h2');
    favTitle.textContent = 'Favorites';
    favTitle.className = 'fav-section-title';

    container.appendChild(favTitle);

    movies.forEach(movie => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'fav-card-div';
        cardDiv.tabIndex = 0;
        
        const img = document.createElement('img');
        img.src = movie.posterURL;
        img.alt = movie.title;
        img.className = 'fav-img';

        const title = document.createElement('h3');
        title.textContent = movie.title;
        title.className = 'fav-title';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeFavorite(movie.title));

        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        cardDiv.appendChild(removeBtn);

        container.appendChild(cardDiv);
    });
}