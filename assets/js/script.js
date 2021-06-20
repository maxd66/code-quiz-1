// defined variables
var questions = ['What do we say to the God of Death?', 'Where are they?!', "Why are you helping me? This isn't your problem."];
var answers = ['Not Today', 'He is at 250 52nd street, and she is on Avenue X, on Cisero', "My friend's problems are my problems."];
var wrongAnswer1 = []
var wrongAnswer2 = []
var wrongAnswer3 = []
var startingIndex = genStartIndex();
var currentIndex = startingIndex;

// common selectors
var questionEl = document.querySelector('.question');
var startButtonEl = document.querySelector('.start-button-div');
var questionEl = document.querySelector('.question');
var optionEl = document.querySelector('.options');

// generates a random starting index

function genStartIndex() {
    var randIndex = Math.floor(Math.random() * questions.length)
    if(randIndex === questions.length) {
        randIndex = 0
    }
    return randIndex;
}


// clears starting header and start button
function clearStart() {
    startButtonEl.innerHTML = '';
    questionEl.textContent = '';
};

// currently assigns the question element with the question index 0 from questions array
function inputQuestion() {
    questionEl.innerHTML = questions[currentIndex];
}

// currently places proper button in options section of inner html
function inputOption() {
    optionEl.innerHTML = '<li><button data-state="correct">' + answers[currentIndex] + '</button></li>'
}

function nextQuestion() {
    currentIndex = currentIndex + 1
    if(currentIndex === questions.length){
        currentIndex = 0;
    }
    if(currentIndex === startingIndex) {
        // stop timer, save score, go to highlight screen
        console.log('finished');
        return
    }else {
        inputQuestion();
        inputOption();
    }
}

optionEl.addEventListener('click', function (event) {
    var element = event.target;
    if(element.matches('li')) {
        return
    };
    if(element.matches('button')) {
        var userAnswer = element.getAttribute('data-state')
        console.log(userAnswer);
        if(userAnswer === 'correct') {
            nextQuestion();
            // add success message
        }
    }

});

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