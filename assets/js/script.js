// defined variables
var questions = ['What do we say to the God of Death?'];

// common selectors
var questionEl = document.querySelector('.question');
var startButtonEl = document.querySelector('.start-button-div');
var questionEl = document.querySelector('.question');
var optionEl = document.querySelector('.options');


// clears starting header and start button
function clearStart() {
    startButtonEl.innerHTML = '';
    questionEl.textContent = '';
};

// currently assigns the question element with the question index 0 from questions array
function inputQuestion() {
    questionEl.innerHTML = questions[0];
}

// currently places proper button in options section of inner html
function inputOption() {
    optionEl.innerHTML = '<li><button>Not Today</button></li>'
}

// adds event listener to start button to run all initializing functions
function init() {
    startButtonEl.addEventListener('click', function () {
        clearStart();
        inputQuestion();
        inputOption();
    });
}

init();