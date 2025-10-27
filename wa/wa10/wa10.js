let triviaBtn = document.querySelector('#js-new-quote').addEventListener('click', newTrivia);
let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);
let current = {
    setup: '',
    delivery: ''
}

const endpoints = {
    any: "https://v2.jokeapi.dev/joke/Any?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    programming: "https://v2.jokeapi.dev/joke/Programming?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    misc: "https://v2.jokeapi.dev/joke/Miscellaneous?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    dark: "https://v2.jokeapi.dev/joke/Dark?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    pun: "https://v2.jokeapi.dev/joke/Pun?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    spooky: "https://v2.jokeapi.dev/joke/Spooky?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
    christmas: "https://v2.jokeapi.dev/joke/Christmas?lang=en&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart"
};

const endpointSelect = document.querySelector('#endpoint-select');

async function newTrivia() {
    try {
        const currEndpoint = endpoints[endpointSelect.value];
        const response = await fetch(currEndpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        current.setup = json.setup;
        current.delivery = json.delivery;
        displayTrivia();
    }
    catch (err) {
        console.log(err);
        alert('failed to get new trivia');
    }
}

function displayTrivia() {
    const questionText = document.querySelector('#js-quote-text');
    questionText.textContent = current.setup;
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = '';

}

function newAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = current.delivery;
}

newTrivia();