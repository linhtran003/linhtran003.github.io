let currentControl = document.querySelector('#project-container')?.classList[0];
let slideIndex = 0;

const listBtn = document.querySelector('#list-ctrl');
const gridBtn = document.querySelector('#grid-ctrl');
const carouselBtn = document.querySelector('#carousel-ctrl');

if (listBtn && gridBtn && carouselBtn) {
    listBtn.addEventListener('click', () => changeView('list-view'));
    gridBtn.addEventListener('click', () => changeView('grid-view'));
    carouselBtn.addEventListener('click', () => changeView('carousel-view'));
}

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => changeSlide('prev'));
    nextBtn.addEventListener('click', () => changeSlide('next'));
}

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

        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    else if (view === 'grid-view') {
        dividers.forEach(divider => {
            divider.style.display = 'none';
        });

        gridBtn.classList.add('active');
        carouselBtn.classList.remove('active');
        listBtn.classList.remove('active');

        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    else {
        dividers.forEach(divider => {
            divider.style.display = 'none';
        });

        gridBtn.classList.remove('active');
        carouselBtn.classList.add('active');
        listBtn.classList.remove('active');

        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        showSlides(slideIndex);
    }
}

function showSlides(index) {
    let i;
    let slides = document.querySelectorAll('.project-item');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    else {
        slideIndex = index;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideIndex].style.display = 'flex';
}

function changeSlide(direction) {
    if (direction === 'prev') {
        showSlides(slideIndex - 1);
    }
    else {
        showSlides(slideIndex + 1);
    }
}

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

let toggle = false;

navToggle.addEventListener('click', (e) => {
    navMenu.classList.toggle('show');
    if (toggle == false) {
        navMenu.setAttribute('aria-expanded', 'true');
        toggle = true;
    }
    else {
        navMenu.setAttribute('aria-expanded', 'false');
        toggle = false;
    }
});