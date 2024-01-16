var currentQuestionIndex = 0;
var time = 60; 
var timerInterval;
var score = 0;

function startQuiz() {
    // Initialize variables
    currentQuestionIndex = 0;
    time = 60; 
    score = 0;
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    
    // Start timer
    timerInterval = setInterval(function() {
        time--;
        updateTimerDisplay();
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
    // Display first question
    displayQuestion();
}

function updateTimerDisplay() {
    document.getElementById('time').textContent = time;
}

function displayQuestion() {
    var question = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.question;
    var choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';

    question.choices.forEach(function(choice) {
        var choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.setAttribute('class', 'choice');
        choiceButton.addEventListener('click', function() {
            checkAnswer(choice);
        });
        choicesElement.appendChild(choiceButton);
    });
}

function checkAnswer(choice) {
    if (choice !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        updateTimerDisplay();
    } else {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('questions').classList.add('hide');
    document.getElementById('end-screen').classList.remove('hide');
    document.getElementById('final-score').textContent = score;
}

document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', function() {
    var initials = document.getElementById('initials').value;
    saveScore(initials);
});

function saveScore(initials) {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: initials, score: score });
    localStorage.setItem('highscores', JSON.stringify(highscores));
}
