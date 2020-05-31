// QUESTIONS
var myQuestions = [
  {
    question: "What is 10/2?",
    answers: {
      a: "3",
      b: "5",
      c: "115",
    },
    correctAnswer: "b",
  },
  {
    question: "What is 30/3?",
    answers: {
      a: "3",
      b: "5",
      c: "10",
    },
    correctAnswer: "c",
  },
];


var startButton = document.getElementById("start")
var timerDiv = document.getElementById("timer")
var quizDiv = document.getElementById("quiz")
var nextButton = document.getElementById("next")
var result = document.getElementById("result")
var finalResult = document.getElementById("finalResult")
var isQuizStart;
var score = 0;
var questionNumber = 0
var timer
var answered 

init()

function init() {
	quizDiv.style.display = "none"
	timerDiv.style.display = "none"
	isQuizStart = false
	questionNumber = 0
	score = 0
}

function startTimer() {
  startQuiz()
  var startTime = 100000;
  timer = setInterval(function () {
    startTime = startTime - 1000;
	timerDiv.innerHTML = startTime / 1000;
	
    if (startTime == 0) {
	  reset()
    }
  }, 1000);
}

function startQuiz() {
	isQuizStart = true
	startButton.style.display = "none"
	quizDiv.style.display = "block"
	timerDiv.style.display = "block"
	finalResult.style.display = "none"
	initQuestion()
}

function initQuestion() {
	answered = false
	result.innerHTML = ""
	result.style.display = "block"
	var children = quizDiv.children
	children[0].innerHTML = myQuestions[questionNumber].question
	children[1].innerHTML = myQuestions[questionNumber].answers.a
	children[2].innerHTML = myQuestions[questionNumber].answers.b
	children[3].innerHTML = myQuestions[questionNumber].answers.c

}


function eval(choice) {
	if (!answered) {
		var correctAnswer = myQuestions[questionNumber].correctAnswer
		if (choice == correctAnswer) {
			result.innerHTML = "Correct"
			score++
		}
		else {
			result.innerHTML = "Wrong"
		}
	
		if (questionNumber == myQuestions.length-1) {
			reset()
		} else {
			questionNumber++
		    answered = true
		}
		
	}
}


function reset() {
	finalResult.innerHTML = score
	clearInterval(timer);
	result.style.display = "none"
	finalResult.style.display = "block"
	startButton.style.display = "block"
	init()
}