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
    question: "What is a method?",
    choice1: "A particular way of doing something.",
    choice2: "A function that is a property of an object.",
    choice3: "A sick snowboarding grab.",
    choice4: "A bunch of strings stored together.",
    correct: "choice2",
  }),
  (question2 = {
    question: "What year was JavaScript created?",
    choice1: "1995",
    choice2: "2004",
    choice3: "2002",
    choice4: "1999",
    correct: "choice1",
  }),
  (question3 = {
    question: "Which of these web browsers support JavaScript?",
    choice1: "Google Chrome",
    choice2: "Mozilla Firefox",
    choice3: "Internet Explorer",
    choice4: "All of the above",
    correct: "choice4",
  }),
  (question4 = {
    question:
      "How long did it take Brendan Eich to write the JavaScript language?",
    choice1: "10 years",
    choice2: "10 months",
    choice3: "10 weeks",
    choice4: "10 days",
    correct: "choice4",
  }),
  (question5 = {
    question: "Which of these words is not a reserved word in JavaScript?",
    choice1: "Default",
    choice2: "Finally",
    choice3: "Undefined",
    choice4: "Throw",
    correct: "choice3",
  }),
];
//this function displays questions one by one as determined by variable j
function displayQuestion() {
  //clear the divs we need
  answersDiv.textContent = "";
  questionDiv.textContent = "";
  //select a question to present and display it in the questionDiv
  var questionSelected = questions[j];
  questionDiv.textContent = questionSelected.question;
  //loop through the possible choices for each question. loop will create buttons and event listeners on each choice to determine right/wrong answers
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
      // if correct, user moves on
      if (userAnswer == correctOption) {
        nextQuestion();
      }
      // if incorrect, subtract 5 seconds and move on
      else {
        timer -= 5;
        nextQuestion();
      }
    });
  }
}

//this function increments the j variable, then displays the next question. when j >4, we are out of questions and can move to the final function
function nextQuestion() {
  if (j < 4 && timer > 0) {
    j++;
    displayQuestion();
  } else {
    displayResults();
  }
}

//this function handles the timer
function startTimer() {
  var timerInterval = setInterval(function () {
    timerEl.textContent = timer;
    timer--;
    if (timer < 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "";
    }
  }, 1000);
}

//this is the last function to run. this shows the user their score and prompts them to save it to local storage
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

//hiscores button will alert the user with the currently saved score
hiscores.addEventListener("click", function () {
  scores = localStorage.getItem("score");
  alert(scores);
});

//when user clicks start, this listener starts the timer and displays the first question
start.addEventListener("click", function () {
  startTimer();
  displayQuestion();
});
