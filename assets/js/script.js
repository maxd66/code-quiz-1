// defined variables
// to input new question, add question and all options in the same index of the subsequent arrays.
var questions = ['What do we say to the God of Death?', 'Where are they?!', "Why are you helping me? This isn't your problem."];
var answers = ['Not Today', 'He is at 250 52nd street, and she is on Avenue X, on Cisero', "My friend's problems are my problems."];
var wrongAnswer1 = ['Sounds Good', 'Who are we talking about?', "I wasn't helping"]
var wrongAnswer2 = ['Can you come back later?', 'They are at KFC', "I'm in it for the snacks"]
var wrongAnswer3 = ['Bet lemme grab my things', 'Right behind you.', 'Who are you, why are you asking me this question']
var startingIndex = genStartIndex();
var currentIndex = startingIndex;

// common selectors
var timerEl = document.getElementById('timer');
var questionEl = document.querySelector('.question');
var startButtonEl = document.querySelector('.start-button-div');
var questionEl = document.querySelector('.question');
var optionEl = document.querySelector('.options');
var listItem1 = document.querySelector('.li1')
var listItem2 = document.querySelector('.li2')
var listItem3 = document.querySelector('.li3')
var listItem4 = document.querySelector('.li4')

// timer function, run when user presses start
function timer() {
    var timeLeft = 59;
    //ticks every 1000ms and runs function
    var timeInterval = setInterval(function () {
        //time runs out, clears interval and runs function to tell score and input initials
      if (timeLeft <= 0) {
        timerEl.textContent = "";
        clearInterval(timeInterval);
      } else {
          //subtracts one from time left and displays "Timer: 60"
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
      }
    }, 1000);
  }

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
//shuffles array for random order of options
function shuffle(array) {
    var shuffleIndex = array.length,  randomShuffleIndex;

    while (0 !== shuffleIndex) {
  
      randomShuffleIndex = Math.floor(Math.random() * shuffleIndex);
      shuffleIndex--;
  
      [array[shuffleIndex], array[randomShuffleIndex]] = [
        array[randomShuffleIndex], array[shuffleIndex]];
    }
  
    return array;
  }
  

// currently places proper button in options section of inner html
function inputOption() {
    //clears previous options and creates new, unshuffled array
    listItem1.innerHTML = '';
    listItem2.innerHTML = '';
    listItem3.innerHTML = '';
    listItem4.innerHTML = '';
    var optionOrder = [1, 2, 3, 4];

    //shuffles the array
    var randomOptionOrder = shuffle(optionOrder);

    //creates new list elements to store the options
    var b1 = document.createElement('button');
    var b2 = document.createElement('button');
    var b3 = document.createElement('button');
    var b4 = document.createElement('button');
    b1.setAttribute('data-state', 'correct');
    b2.setAttribute('data-state', 'wrong');
    b3.setAttribute('data-state', 'wrong');
    b4.setAttribute('data-state', 'wrong');
    b1.textContent = answers[currentIndex];
    b2.textContent = wrongAnswer1[currentIndex];
    b3.textContent = wrongAnswer2[currentIndex];
    b4.textContent = wrongAnswer3[currentIndex];

    var buttonArray = [b1, b2, b3, b4]

    //appends options in random order, based on the order of the shuffled array
    for(i = 0; i < 4; i++) {
        if(randomOptionOrder[0] === 1) {
            listItem1.appendChild(buttonArray[i]);
            randomOptionOrder.shift();
        }else if(randomOptionOrder[0] === 2) {
            listItem2.appendChild(buttonArray[i]);
            randomOptionOrder.shift();
        }else if(randomOptionOrder[0] === 3) {
            listItem3.appendChild(buttonArray[i]);
            randomOptionOrder.shift();
        }else if(randomOptionOrder[0] === 4) {
            listItem4.appendChild(buttonArray[i]);
            randomOptionOrder.shift();
            }
    }
}

//changes to the next question by increasing current index and running input question/options
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

// event listener for options
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
        } else {
            nextQuestion();
            //display wrong, subtract from timer
        }
    }

});

// adds event listener to start button to run all initializing functions
function init() {
    startButtonEl.addEventListener('click', function () {
        clearStart();
        inputQuestion();
        inputOption();
        timer();
    });
}

init();