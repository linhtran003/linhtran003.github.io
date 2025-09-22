const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

let toggle = false;

navToggle.addEventListener('click', (e) => {
    navMenu.classList.toggle('show');
    if (toggle == false) {
        navMenu.setAttribute('aria-expanded', 'true');
        navToggle.style.color = blue;
        toggle = true;
    }
    else {
        navMenu.setAttribute('aria-expanded', 'false');
        toggle = false;
    }
});