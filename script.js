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
//this function displays questions one by one as determined by variable j
function displayQuestion() {
  //clear the divs we need
  answersDiv.textContent = "";
  questionDiv.textContent = "";
  //select a question to present
  var questionSelected = questions[j];
  questionDiv.textContent = questionSelected.question;
  //loop through the possible choices for each question. loop will create buttons from each choice and event listeners to determine right/wrong answers
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
  if (j < 4) {
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
      displayResults();
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
