let currentControl = document.querySelector('#project-container').classList[0];

const listBtn = document.querySelector('#list-ctrl');
const gridBtn = document.querySelector('#grid-ctrl');
const carouselBtn = document.querySelector('#carousel-ctrl');

listBtn.addEventListener('click', () => changeView('list-view'));
gridBtn.addEventListener('click', () => changeView('grid-view'));
carouselBtn.addEventListener('click', () => changeView('carousel-view'));


function changeView(view) {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.classList.remove(currentControl);
    projectContainer.classList.add(view);
    currentControl = view;

    const dividers = document.querySelectorAll('.divider');

    let items = document.querySelectorAll('.project-item');

    items.forEach(item => {
        item.style.display = '';
    });

    if (view === 'list-view') {
        dividers.forEach(divider => {
            divider.style.display = 'flex';
        });

        gridBtn.classList.remove('active');
        carouselBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
    else if (view === 'grid-view') {
        dividers.forEach(divider => {
            divider.style.display = 'none';
        });

        gridBtn.classList.add('active');
        carouselBtn.classList.remove('active');
        listBtn.classList.remove('active');
    }
    else {
        dividers.forEach(divider => {
            divider.style.display = 'none';
        });

        gridBtn.classList.remove('active');
        carouselBtn.classList.add('active');
        listBtn.classList.remove('active');

        showSlides(slideIndex);
    }
}

let slideIndex = 4;

function showSlides(index) {
    let i;
    let slides = document.querySelectorAll('.project-item');
    if (index > slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideIndex].style.display = 'flex';
}