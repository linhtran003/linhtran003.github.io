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

let themeBtn = document.querySelector('#theme')
themeBtn.addEventListener('click', setTheme);

// Save user's theme choice
function setTheme() {
  const currentTheme = document.body.className;
  let newTheme = 'dark';
  if (currentTheme == 'dark') {
    newTheme = 'light';
  }
  else {
    newTheme = 'dark';
  }

  console.log('this is the new theme set', newTheme);
  localStorage.setItem('userTheme', newTheme);
  document.body.className = newTheme;
}

// Load saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    document.body.className = savedTheme;
});