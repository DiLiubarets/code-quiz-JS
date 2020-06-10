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
      "Which of the following function of scoreObjber object defines how many total digits to display of a scoreObjber?",
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
      a:
        "You should not use any of the JavaScript reserved keyword as variable name.",
      b: "JavaScript variable names should not start with a scoreObjeral (0-9).",
      c: " Both of the above.",
    },
    correctAnswer: "c",
  },
];
// initial required variables
var startButton = document.getElementById("start");
var timerDiv = document.getElementById("timer");
var quizDiv = document.getElementById("quiz");
var nextButton = document.getElementById("next");
var result = document.getElementById("result");
var finalResult = document.getElementById("finalResult");
var textP = document.getElementById("text");
var saveDiv = document.getElementById("save")
var initialsInput = document.getElementById("initialsInput")
var highScoresDiv = document.getElementById("highScores")

var isComplete = false;
var isQuizStart = false;
var score = 0;
var index = 0;
var startTime;
var timer;
var answered;
var highScores;


init();

function init() {
  quizDiv.style.display = "none";
  timerDiv.style.display = "none";
  
  //saveDiv display validation
  if (!isComplete) {
    saveDiv.style.display = "none";
  } else {
    saveDiv.style.display = "block";
  }

  //get highscores
  if (localStorage.getItem("highScores")) {
    highScores = JSON.parse(localStorage.getItem("highScores"))
  } else {
    highScores = []
  }

  renderScores()

}

function startQuiz() {
  startTimer();
  score = 0;
  isQuizStart = true;
  isComplete = false;

  textP.style.display = "none";
  startButton.style.display = "none";
  highScoresDiv.style.display = "none";
  saveDiv.style.display = "none";
  quizDiv.style.display = "block";
  timerDiv.style.display = "block";
  finalResult.style.display = "none";
  initQuestion();
}

function startTimer() {
  startTime = 100000;
  timerDiv.innerHTML = startTime / 1000;
  timer = setInterval(function () {
    startTime = startTime - 1000;
    timerDiv.innerHTML = startTime / 1000;

    if (!(startTime > 0)) {
      reset();
    }
  }, 1000);
}

// function to set the questions data 
function initQuestion() {
  result.style.display = "block";
  result.innerHTML = "";
  answered = false;
  var children = quizDiv.children;
  children[0].innerHTML = myQuestions[index].question;
  children[1].innerHTML = myQuestions[index].answers.a;
  children[2].innerHTML = myQuestions[index].answers.b;
  children[3].innerHTML = myQuestions[index].answers.c;
}

function eval(choice) {
  if (!answered) {
    var correctAnswer = myQuestions[index].correctAnswer;
    if (choice == correctAnswer) {
      result.innerHTML = "Correct";
      score++;
    } else {
      result.innerHTML = "Wrong";
      startTime = startTime - 10000;
      
    }

    if (index == myQuestions.length -1) {
      reset();
    } else {
      index++;
      answered = true;
    }
  }
}

function reset() {
  isComplete = true;
  isQuizStart = false;
  index = 0;
  clearInterval(timer);

  result.style.display = "none";
  finalResult.style.display = "block";
  startButton.style.display = "block";
  highScoresDiv.style.display = "block"
  saveDiv.style.display = "block"
  finalResult.innerHTML = "You answered  " + score + " questions correctly";
  init();
}

function saveScore() {
  var initials = initialsInput.value

  if (!initials || initials == "") {
    alert("Please enter initials")
    return
  }

  var scoreObject = {
    initial: initials,
    score: score
  }

  var arranged = arrangeScores(scoreObject, highScores)
  console.log(arranged)
  localStorage.setItem("highScores", JSON.stringify(arranged))
  renderScores()
}

function renderScores() {
  highScoresDiv.innerHTML = ""
  var ul = document.createElement("ul")

  for (var entry of highScores) {
    var li = document.createElement("li")
    li.innerHTML = "Initials: " + entry.initial + " Score: " + entry.score
    ul.appendChild(li)
  }
  highScoresDiv.append(ul)
}

function arrangeScores(scoreObj, array) {
  if (array.length == 0) {
    array.push(scoreObj)
  } else if(scoreObj.score <= array[0].score) {
      array.unshift(scoreObj)
  } else if (scoreObj.score >= array[array.length-1].score) {
      array.push(scoreObj)
  }
   else {
    for (i=0; i < array.length-1; i++) {
      if (scoreObj.score > array[i].score && scoreObj.score <= array[i+1].score) {
        array.splice(i+1, 0, scoreObj)
        break
      }
    }
  }
  return array
}

function clearsHighscores(){
  localStorage.clear();
  renderScores() 
  highScoresDiv.innerHTML = ""

}