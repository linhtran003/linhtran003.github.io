let triviaBtn = document.querySelector('#js-new-quote').addEventListener('click', newTrivia);
let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);
let current = {
    question: '',
    answer: ''
}

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function newTrivia() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        current.question = json.question;
        current.answer = json.answer;
        displayTrivia();
    }
    catch (err) {
        console.log(err);
        alert('failed to get new trivia');
    }
}

function displayTrivia() {
    const questionText = document.querySelector('#js-quote-text');
    questionText.textContent = current.question;
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = '';

}

function newAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = current.answer;
}

newTrivia();