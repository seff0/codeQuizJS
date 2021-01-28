//linking DOM to js
var questionDiv = document.getElementById("question-div");
var answersDiv = document.getElementById("answers-div");
var start = document.getElementById("start");
var hiscores = document.getElementById("hiscore");
var timerEl = document.getElementById("timer");

//VARIABLES
var timer = 30;
//needed a counter in global scope
var j = 0;

//array of questions to be presented. set up as objects with keys
var questions = [
  (question1 = {
    question: "question 1 ...........",
    choice1: "Lorem ipsum",
    choice2: "Lorem ipsum",
    choice3: "Lorem ipsum",
    choice4: "Lorem ipsum",
    correct: "choice2",
  }),
  (question2 = {
    question: "question 2 ...........",
    choice1: "Lorem ipsum",
    choice2: "Lorem ipsum",
    choice3: "Lorem ipsum",
    choice4: "Lorem ipsum",
    correct: "choice1",
  }),
  (question3 = {
    question: "question 3 ...........",
    choice1: "Lorem ipsum",
    choice2: "Lorem ipsum",
    choice3: "Lorem ipsum",
    choice4: "Lorem ipsum",
    correct: "choice4",
  }),
  (question4 = {
    question: "question 4 ...........",
    choice1: "Lorem ipsum",
    choice2: "Lorem ipsum",
    choice3: "Lorem ipsum",
    choice4: "Lorem ipsum",
    correct: "choice4",
  }),
  (question5 = {
    question: "question 5 ...........",
    choice1: "Lorem ipsum",
    choice2: "Lorem ipsum",
    choice3: "Lorem ipsum",
    choice4: "Lorem ipsum",
    correct: "choice3",
  }),
];

function displayQuestion() {
  answersDiv.textContent = "";
  questionDiv.textContent = "";
  var questionSelected = questions[j];
  questionDiv.textContent = questionSelected.question;
  for (i = 1; i < 5; i++) {
    var option = Object.values(questionSelected);
    var optionKey = Object.keys(questionSelected);
    var optionSelected = option[i];
    var correctOption = option[5];
    var button = document.createElement("button");
    button.className = "answer-btn";
    button.id = optionKey[i];
    button.textContent = optionSelected;
    answersDiv.append(button);
    button.addEventListener("click", function (event) {
      var userAnswer = event.target.id;
      if (userAnswer == correctOption) {
        nextQuestion();
      } else {
        timer -= 5;
        nextQuestion();
      }
    });
  }
}

function nextQuestion() {
  if (j < 4) {
    j++;
    displayQuestion();
  } else {
    displayResults();
  }
}

function startTimer() {
  var timerInterval = setInterval(function () {
    timerEl.textContent = timer;
    timer--;
    if (timer < 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "";
      displayResults();
    }
  }, 1000);
}

function displayResults() {
  timerEl.textContent = "";
  var timeRemaining = timer;
  var score = timeRemaining;
  timer = 0;
  questionDiv.textContent = "Your score is: " + score;
  answersDiv.textContent = "";
  var initials = prompt("Leave your initials to save your score:");
  localStorage.setItem("score", initials + "-" + score);
}

hiscores.addEventListener("click", function () {
  scores = localStorage.getItem("score");
  alert(scores);
});

start.addEventListener("click", function () {
  startTimer();
  displayQuestion();
});
