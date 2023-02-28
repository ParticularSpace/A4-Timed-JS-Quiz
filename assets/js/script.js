var currentQuestion = 0;
var score = 0;
var timer = 50;
var startButton = document.getElementById("start-btn");
var quizQuestion = document.getElementById("quiz-question");
var quizAnswers = document.getElementById("quiz-answers");
var quizTimer = document.getElementById("quiz-timer");
var quizScore = document.getElementById("quiz-score");
var quizEnd = document.getElementById("quiz-end");


var countdown;



// Start the quiz

startButton.addEventListener("click", function () {
    // Hide the start button
    startButton.style.display = "none";
    document.querySelector('.quiz').classList.remove('hide');
    // Call the showQuestions() function to display the first question
    showQuestions();
    // Start the timer
    countdown = setInterval(function () {
        timer--;
        quizTimer.textContent = timer;

        if (timer <= 0) {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
});

// questions and answers
const myQuestions = [
    {
        question: "Which of the following is written correctly?",
        answers: {
            a: "Helloworld",
            b: "helloworld",
            c: "HelloWorld",
            d: "helloWorld"
        },
        correctAnswer: 'd',
    },
    {
        question: "What is this quiz about?",
        answers: {
            a: "Top Spotify Artists",
            b: "How to roast a chicken",
            c: "About my favorite food sushi",
            d: "How to be a pro at javascript"
        },
        correctAnswer: 'd',
    },
    {
        question: "Where can you learn to code javaScript?",
        answers: {
            a: "UC Berkeley Coding Boot camp Extension",
            b: "Watch netflix",
            c: "Socializing with friends",
            d: "Having a life"
        },
        correctAnswer: 'a',
    },
    {
        question: "What's the best music to listen to while coding javaScript?",
        answers: {
            a: "EDM!",
            b: "Jazz",
            c: "lof-fi",
            d: "ANYTHING but country"
        },
        correctAnswer: 'd',
    },
    {
        question: "Do you eat while you code javaScript?",
        answers: {
            a: "I have the dustiest keyboard in the world",
            b: "I have the cleanest keyboard in the world",
            c: "Its impossible to eat and code at the same time",
            d: "We aren't perfect but we aren't slobs either"
        },
        correctAnswer: 'd',
    }
];

function showQuestions() {
    var myQuestion = myQuestions[currentQuestion];
    quizQuestion.textContent = myQuestion.question;
    quizAnswers.innerHTML = "";
    for (var answer in myQuestion.answers) {
        var button = document.createElement("button");
        button.textContent = answer + ": " + myQuestion.answers[answer];
        button.setAttribute("value", answer);
        button.addEventListener("click", checkAnswer);
        quizAnswers.appendChild(button);
    }
};

// i dont want an alert to pop up when i click on the correct answer
function checkAnswer() {
    if (this.value === myQuestions[currentQuestion].correctAnswer) {
        score++;
        quizScore.textContent = score;
    } else {
        timer -= 10;
    }
    currentQuestion++;
    if (currentQuestion === myQuestions.length) {
        endQuiz();
    } else {
        showQuestions();
    }
};

function endQuiz() {
    clearInterval(countdown);
    quizQuestion.textContent = "All done!";
    quizAnswers.innerHTML = "";
    quizEnd.classList.remove("hide");
    quizEnd.textContent = "Your final score is " + score + " out of " + myQuestions.length + "!";
    saveHighScore();
}

function saveHighScore() {

    var initials = prompt("Enter your initials to save your score!");

    if (initials === null) {
        return;
    }

    var highScore = {
        initials: initials,
        score: score
    };


    // Pull any existing high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the new high score
    highScores.push(highScore);

    // Sort the high scores by score
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Display the high scores
    var highScoresList = document.getElementById("highScores");

    localStorage.setItem("highScores", JSON.stringify(highScores));

    for (var i = 0; i < highScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoresList.appendChild(listItem);
    };
};

// create a button to clear the high scores












