// defined variables
var questions = ['What do we say to the God of Death?', 'Where are they?!'];
var answers = ['Not Today', 'He is at 250 52nd street, and she is on Avenue X, on Cisero'];
startingIndex = Math.floor(Math.random()*questions.length);
currentIndex = startingIndex

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
    if(currentIndex == questions.length) {
        currentIndex = 0
    }
    questionEl.innerHTML = questions[currentIndex];
}

// currently places proper button in options section of inner html
function inputOption() {
    optionEl.innerHTML = '<li><button>' + answers[currentIndex] + '</button></li>'
}

function nextQuestion() {
    currentIndex = currentIndex++
    if(currentIndex === questions.length) {
        currentIndex = 0
    }
}

// adds event listener to start button to run all initializing functions
function init() {
    startButtonEl.addEventListener('click', function () {
        clearStart();
        inputQuestion();
        inputOption();
        console.log(currentIndex + ' ' + startingIndex)
    });
}

init();