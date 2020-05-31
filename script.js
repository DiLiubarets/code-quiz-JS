// QUESTIONS
var myQuestions = [
  {
    question: "Which of the following code creates an object?",
    answers: {
      a: "var book = Object();",
      b: "var book = new Object();",
      c: "var book = new OBJECT();",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Which of the following function of String object returns the calling string value converted to lower case while respecting the current locale?",
    answers: {
      a: " toString()",
      b: " toLowerCase()",
      c: "toLocaleLowerCase()",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following function of Array object applies a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value?",
    answers: {
      a: " reduceRight()",
      b: " reduce()",
      c: "push()",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Which of the following function of String object causes a string to be displayed in a small font, as if it were in a <small> tag?",
    answers: {
      a: "sub()",
      b: "sup()",
      c: "small()",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following function of String object is used to match a regular expression against a string?",
    answers: {
      a: "replace()",
      b: "match()",
      c: "search()",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Which of the following function of Number object defines how many total digits to display of a number?",
    answers: {
      a: "toPrecision()",
      b: "toFixed()",
      c: "toExponential()",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Which built-in method returns the character at the specified index?",
    answers: {
      a: "characterAt()",
      b: "getCharAt()",
      c: "charAt()",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following is true about variable naming conventions in JavaScript?",
    answers: {
      a: "You should not use any of the JavaScript reserved keyword as variable name.",
      b: "JavaScript variable names should not start with a numeral (0-9).",
      c: " Both of the above.",
    },
    correctAnswer: "c",
  },
];

var startButton = document.getElementById("start");
var timerDiv = document.getElementById("timer");
var quizDiv = document.getElementById("quiz");
var nextButton = document.getElementById("next");
var result = document.getElementById("result");
var finalResult = document.getElementById("finalResult");
var textP = document.getElementById("text");
var isQuizStart;
var score = 0;
var questionNumber = 0;
var timer;
var answered;

init();

function init() {
  quizDiv.style.display = "none";
  timerDiv.style.display = "none";
  isQuizStart = false;
  questionNumber = 0;
  score = 0;
}

function startTimer() {
  startQuiz();
  var startTime = 100000;
  timer = setInterval(function () {
    startTime = startTime - 1000;
    timerDiv.innerHTML = startTime / 1000;

    if (startTime == 0) {
      reset();
    }
  }, 1000);
}

function startQuiz() {
  textP.style.display = "none";
  isQuizStart = true;
  startButton.style.display = "none";
  quizDiv.style.display = "block";
  timerDiv.style.display = "block";
  finalResult.style.display = "none";
  initQuestion();
}

function initQuestion() {
  answered = false;
  result.innerHTML = "";
  result.style.display = "block";
  var children = quizDiv.children;
  children[0].innerHTML = myQuestions[questionNumber].question;
  children[1].innerHTML = myQuestions[questionNumber].answers.a;
  children[2].innerHTML = myQuestions[questionNumber].answers.b;
  children[3].innerHTML = myQuestions[questionNumber].answers.c;
}

function eval(choice) {
  if (!answered) {
    var correctAnswer = myQuestions[questionNumber].correctAnswer;
    if (choice == correctAnswer) {
      result.innerHTML = "Correct";
      score++;
    } else {
      result.innerHTML = "Wrong";
    }

    if (questionNumber == myQuestions.length - 1) {
      reset();
    } else {
      questionNumber++;
      answered = true;
    }
  }
}

function reset() {
  finalResult.innerHTML = score;
  clearInterval(timer);
  result.style.display = "none";
  finalResult.style.display = "block";
  startButton.style.display = "block";
  init();
}
