// defined variables
// to input new question, add question and all options in the same index of the subsequent arrays.
var questions = ['What do we say to the God of Death?', 'What can we use in Javascript to check for dates and times?', "What should you do when you don't understand something?", "If you want to get a specific element that was clicked in a div, what command should we use?", "What are the steps taken to push something to GitHub?"];
var answers = ['Not Today', 'Moment.js', "Read the docs, go through activities, and go to office hours.", "event.target for the WIN!", "git add -A, git commit -m, git pull, git push origin main"];
var wrongAnswer1 = ['Sounds Good', 'A clock', "Give up", "document.queryselector('button').textContent = 'flippy'", "git er done"]
var wrongAnswer2 = ['Can you come back later?', 'Jquery', "Smash the computer", 'Banana?', 'git commmit, git add, git pull']
var wrongAnswer3 = ['Bet lemme grab my things', 'Mr timey man', 'Randomly type things you have seen before until something works?', 'Get a second monitor so you can see it.', "first git some snacks,then git to coding"]
var startingIndex = genStartIndex();
var currentIndex = startingIndex;
var timeLeft = 59;
var userScore = 0;
var gameOver = false;
var userInitials = '';

// for leader board setting and retrieval
var scores = [];
var times = [];
var initialsArr = [];

// common selectors
var timerEl = document.getElementById('timer');
var userInputEl = document.querySelector('.user-input');
var inputEl = document.querySelector('input');
var questionEl = document.querySelector('.question');
var startButtonEl = document.querySelector('.start-button-div');
var questionEl = document.querySelector('.question');
var optionEl = document.querySelector('.options');
var listItem1 = document.querySelector('.li1');
var listItem2 = document.querySelector('.li2');
var listItem3 = document.querySelector('.li3');
var listItem4 = document.querySelector('.li4');
var messageEl = document.querySelector('.quickMessage');
var olParentEl = document.querySelector('.ol-parent');
var orderedListEl = document.querySelector('ol');
var initialsEl = document.querySelector('input');

// timer function, run when user presses start
function timer() {
    //ticks every 1000ms and runs function
    var timeInterval = setInterval(function () {
        //time runs out, clears interval and runs function to tell score and input initials
      if (timeLeft <= 0 && gameOver == false) {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        gameOverFunc();
      } else if(gameOver === true) {
        timerEl.textContent = "";
        clearInterval(timeInterval);
      } else {
          //subtracts one from time left and displays "Timer: 60"
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
      }
    }, 1000);
}

document.getElementById('leaderboard-button').addEventListener('click', function () {
    clearStart();
    showLeaderboard();
})

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

// assigns question with matching index in question array
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
  
// places all options according to shuffled order of array
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
        gameOverFunc();
        return
    }else {
        inputQuestion();
        inputOption();
    }
}

//displays success message for 2 seconds
function displaySuccess() {
    messageEl.textContent = 'Great Job! You got that answer right! ????????';
    setTimeout(function() {messageEl.textContent = ''}, 2000)
}

//displays wrong message for 2 seconds
function displayWrong() {
    messageEl.textContent = 'Oof, that one was not right ????. Time is ticking! ???'
    setTimeout(function() {messageEl.textContent = ''}, 2000)
}
// event listener for options
optionEl.addEventListener('click', function (event) {
    var element = event.target;
    if(element.matches('li')) {
        return
    };
    if(element.matches('button')) {
        var userAnswer = element.getAttribute('data-state')
        if(userAnswer === 'correct') {
            userScore = userScore + 1
            nextQuestion();
            displaySuccess();
        } else {
            timeLeft = timeLeft - 15
            displayWrong();
            nextQuestion();
        }
    }

});

//replaces questions and options with end message of score and time left
function gameOverFunc() {
    listItem1.innerHTML = '';
    listItem2.innerHTML = '';
    listItem3.innerHTML = '';
    listItem4.innerHTML = '';
    gameOver = true
    if(userScore === questions.length) {
        questionEl.textContent = 'AMAZING JOB! You got ' + userScore + ' out of ' + questions.length + ' right! With ' + timeLeft + ' seconds to spare!'
    } else if (userScore > 0) {
    questionEl.textContent = 'Good attempt! You got ' + userScore + ' out of ' + questions.length + ' right! With ' + timeLeft + ' seconds to spare. Try again for a perfect score!'
    } else {
        questionEl.textContent = "Good try! You didn't get any of them this time and you had " + timeLeft + " seconds left. Keep studying and bring that score up."
    } 
    initalInput();
    scores.push(userScore);
    times.push(timeLeft);
}

//saves scores to local storage
function valueSaver() {
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('times', JSON.stringify(times));
    localStorage.setItem('initialsArr', JSON.stringify(initialsArr));
}

function retrieveStored() {
    var storedScores = JSON.parse(localStorage.getItem('scores'));
    
    if (storedScores !== null) {
        scores = storedScores;
    };
    
    var storedTimes = JSON.parse(localStorage.getItem('times'));
    
    if (storedTimes !== null) {
        times = storedTimes;
    };
    
    var storedInitials = JSON.parse(localStorage.getItem('initialsArr'));
    
    if (storedInitials !== null) {
        initialsArr = storedInitials;
    };
}

function showLeaderboard() {
    valueSaver();
    document.getElementById('leaderboard-button').disabled = true

    userInputEl.innerHTML = ''
    questionEl.textContent = 'Leaderboard';
    var olEl = document.createElement('ol');
    olParentEl.appendChild(olEl);
    olEl.innerHTML = '';

    for(var i = 0; i < initialsArr.length; i++) {
        var orderedListItem = document.createElement('li');
        orderedListItem.setAttribute('data-index', scores[i]);
        orderedListItem.textContent = ('Player: ' + initialsArr[i] + '  Score: ' + scores[i] + '  Time: ' + times[i]);
        olEl.appendChild(orderedListItem)
    }

    var clearBtn = document.createElement('button');
    clearBtn.setAttribute('id', 'clear-leaderboard');
    clearBtn.textContent = 'Clear Leaderboard';
    document.querySelector('footer').appendChild(clearBtn);
    document.getElementById('clear-leaderboard').addEventListener('click', function() {
        localStorage.clear();
        olEl.innerHTML = '';
    })

    var playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('id', 'playAgain');
    playAgainBtn.textContent = 'Play Again?';
    document.querySelector('footer').appendChild(playAgainBtn);
    document.getElementById('playAgain').addEventListener('click', function() {
        location.reload();
    })
}

userInputEl.addEventListener('submit', function (event) {
    event.preventDefault();
    if(document.getElementById('initials').value.trim() === '') {
        alert("You didn't put in any initials!")
        return
    }
    initialsArr.push(document.getElementById('initials').value);
    showLeaderboard();
})

//creates input box and label for initials
function initalInput () {
    var input = document.createElement('input');
    var label = document.createElement('label');
    userInputEl.appendChild(label);
    label.setAttribute('for', 'initials');
    label.textContent = 'Put your initials here to go on the leaderboard!'
    userInputEl.appendChild(input);
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'initials');
    input.setAttribute('placeholder', 'Initials');
}

// adds event listener to start button to run all initializing functions
function init() {
    retrieveStored();

    startButtonEl.addEventListener('click', function () {
        clearStart();
        inputQuestion();
        inputOption();
        timer();
        document.getElementById('leaderboard-button').disabled = true
    });
}

init();