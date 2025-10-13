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

// SUBMIT BUTTON ON FORM
const formSubmit = document.querySelector('.find-tutor-form');

if (formSubmit) {
    formSubmit.addEventListener('submit', (e) => {
        alert('Your form has been submitted!')
    });
}

// Get all filter buttons and subject cards
const filterButtons = document.querySelectorAll('.subject-nav-container button');
const subjectCards = document.querySelectorAll('.subject-card');

// Add click event to each button
filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const filterValue = event.target.textContent.toLowerCase();
    filterSubjects(filterValue);
  });
});

function filterSubjects(category) {
  subjectCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

const form = document.querySelector('.find-tutor-form');
const eraseUserDataButton = document.getElementById('erase-user-data');

// save userData to local storage
if (form) {
  form.addEventListener('submit', (event) => {
    console.log('the form has beeen submitted')
    event.preventDefault()
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const zipcode = document.getElementById('zipcode').value;

    const userData = {name, phone, email, zipcode};
    localStorage.setItem('userData', JSON.stringify(userData));
    updateWelcome();
  });
}
// erase userData if button is clicked
if (eraseUserDataButton) {
  eraseUserDataButton.addEventListener('click', () => {
    localStorage.removeItem('userData');
    updateWelcome();
  });
}

// function runs every time form is submitted, page loads, or userData is cleared
function updateWelcome() {
  const welcome = document.getElementById('welcome');
  const userDataString = localStorage.getItem('userData');

  if (welcome && userDataString) {
    const userData = JSON.parse(userDataString);
    welcome.textContent = `Welcome, ${userData.name}!`;
  }
  else if (welcome) {
    welcome.textContent = 'Welcome!';
  }
}

// query selector for the change mode/theme button
let themeBtn = document.querySelector('#theme')
themeBtn.addEventListener('click', setTheme);

// Save user's theme choice
function setTheme() {
  // set new theme to be the opposite of current theme
  const currentTheme = document.body.className;
  let newTheme = 'dark';
  if (currentTheme == 'dark') {
    newTheme = 'light';
  }
  else {
    newTheme = 'dark';
  }

  console.log('this is the new theme set', newTheme);
  localStorage.setItem('userTheme', newTheme); // set userTheme in localStorage to be newTheme
  document.body.className = newTheme; // set new theme in the whole document
}

// Load saved theme and welcome text content on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    document.body.className = savedTheme;
    updateWelcome();
});