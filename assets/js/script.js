var questionEl = document.querySelector('.question');
var questions = ['What do we say to the God of Death?'];
var startButtonEl = document.querySelector('.start-button-div');
var questionEl = document.querySelector('.question');
var optionEl = document.querySelector('.options');

function clearStart() {
    startButtonEl.innerHTML = '';
    questionEl.textContent = '';
};

function inputQuestion() {
    questionEl.innerHTML = questions[0];
}

function inputOption() {
    optionEl.innerHTML = '<li><button>Not Today</button></li>'
}

startButtonEl.addEventListener('click', function () {
    clearStart();
    inputQuestion();
    inputOption();
});