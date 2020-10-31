// Here is a list of multiple choice questions and their answers
var questions = [ 
    {
        "question": "Which built-in method combines the text of two strings and returns a new string?",
        "answers": ["append()","concat()","attach()","None of the above"],
        "correct":1

    }, {
        "question": "Which of the following function of String object returns the calling string value converted to lower case?",
        "answers": ["substring()","toString()","toLowerCase()","lowerCase()"],
        "correct":2

    },{
        "question": "What will this be displayed on the screen: console.log(3<7)?",
        "answers": ["NaN","3<7","true","SyntaxError"],
        "correct":2

    }, {
        "question": "Which is the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        "answers": ["if(x 2)","if x=2","if(x!=2)","if(x===2) { }"],
        "correct":3

    },{
        "question": "When assigning to a variable, the values of type 'String' are enclosed with:",
        "answers": ["parentheses","curly brackets","quotes","commas"],
        "correct": 2
    }, {
        "question": "Which of the following is a good debugging tool during the code development?",
        "answers": ["google.com","console.log()","StackOverflow","gitHub"],
        "correct": 1
    }, {
        "question": "How to ask the user if they want to reload the page?",
        "answers": ["alert('Do you want to reload the page?')","confirm('Do you want to reload the page?)","'Do you want to reload the page'","None of the above"],
        "correct": 1
    }, {
        "question": "Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
        "answers": ["push()","join()","pop()","map()"],
        "correct":3

    },{
        "question": "'For' loop is enclosed with the following:",
        "answers": ["quotes","curly brackets","square brackets","parentheses"],
        "correct": 3
    }
]



// Selecting the proper tags, id_elements and class_elements

var startPage = document.getElementById("quiz_intro");
var startButton = document.getElementById("start_button");
var timerEl = document.getElementById("timer");
var viewScores = document.getElementById("btn_scores");
var quiz_page = document.getElementById("list_questions");
var presentQuestions = document.getElementById("question");
var listOfAnswers = document.getElementById("answers");
var firstAnswer = document.getElementById("answer1");
var secondAnswer = document.getElementById("answer2");
var thirdAnswer = document.getElementById("answer3");
var fourthAnswer = document.getElementById("answer4");
var correctOrWrong = document.getElementById("assessment");
var namePage = document.getElementById("results");
var presentScores = document.getElementById("final_score");
var inputYourInitials = document.getElementById("initials");
var submitYourInitials = document.getElementById("btn_submit_initials");
var highscorePage = document.getElementById("show_scores");
var earnedScores = document.getElementById("earned_scores");
var homeButton = document.getElementById('home_btn')
var clearScores = document.getElementById('btn_clear_scores')


var startingTime = 75;
var subtractedTime = 10;
var intervalTimer;
var timeLeft; 
var quizOver = false
var nextQuestionIndex 
var randomizedQuestions 
var question_number = 0
var score = 0
var finalScore = 0




function quizTime() {
  timeLeft = startingTime;
  var timeInterval = setInterval(function() {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = 0;
      clearInterval(timeInterval);
      quizFinished()
    }
    else if (quizOver){
        clearInterval(timeInterval);
    }

  }, 1000);
}

function startQuiz() {
    startPage.setAttribute(
        "style",
        "display: none");
}



/** Display the questions page. */
function displayQuestionPage() {
    quiz_page.classList.remove("hidden");
    nextQuestionIndex = 0
    score = 0
    question_number = 0

    // start the timer
    // startQuiz()

    // setup the first question
    showQuestion(question_number)
}



function showQuestion(question_index){
    presentQuestions.textContent = questions[question_index].question;
    firstAnswer.textContent = questions[question_index].answers[0];
    secondAnswer.textContent = questions[question_index].answers[1];
    thirdAnswer.textContent = questions[question_index].answers[2];
    fourthAnswer.textContent = questions[question_index].answers[3];
}

function nextQuestion(event){
    if (event.target.matches("button")){
        if (question_number>=questions.length-1 || timeLeft<=0) {
            quizFinished()
            return
        }
        console.log(event.target.textContent)
        var answersArray = questions[question_number].answers
        var correctIndex = questions[question_number].correct
        if (event.target.textContent==answersArray[correctIndex]) {
            console.log("Correct!")
            score++
            correctOrWrong.textContent = "Correct"
        }
        else {
            console.log("Incorrect!")
            correctOrWrong.textContent = "Incorrect"
            timeLeft-=subtractedTime
        }
        question_number++
        showQuestion(question_number)
        setTimeout(function(){ correctOrWrong.textContent=""; }, 1100);

    }
    console.log(event.target)
    
}

function quizFinished(){
    console.log("Done")
    quiz_page.classList.add("hidden")
    namePage.classList.remove("hidden")
    quizOver=true
    if (score===0 || timeLeft<=0){
        finalScore=0
    }
    finalScore = score*timeLeft
    presentScores.textContent = finalScore

}


function renderScores(event){
    event.preventDefault();
    namePage.classList.add("hidden")
    highscorePage.classList.remove("hidden")

    var show_scores = {
        initials: inputYourInitials.value.trim(),
        score:finalScore
    };
    console.log(show_scores)

    localStorage.setItem("show_scores", JSON.stringify(show_scores));
    var lastSubmission = JSON.parse(localStorage.getItem("show_scores"));
    earnedScores.textContent = lastSubmission.initials + ", score: " +lastSubmission.score;
    localStorage.getItem(finalScore);
    
}

function goToStart(){
    highscorePage.classList.add("hidden")
    startPage.setAttribute(
        "style",
        "display: block");
    clearInterval(intervalTimer)
    timeLeft=0
    timerEl.textContent = timeLeft
    
}

function clearYourScore(event){
    var clear = confirm("Would you like to clear your scores?")
    if (clear) {
        event.preventDefault()
        localStorage.setItem('show_scores', "[]")
        earnedScores.textContent = "Scores cleared";
    }
}

function clickHighScoreButton(event){
    // event.preventDefault();
    startQuiz();
    renderScores(event);
}


startButton.addEventListener("click", quizTime);
startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", displayQuestionPage);
listOfAnswers.addEventListener("click", nextQuestion);
submitYourInitials.addEventListener("click", renderScores);
homeButton.addEventListener("click", goToStart);
clearScores.addEventListener("click", clearYourScore);
viewScores.addEventListener("click", clickHighScoreButton);







































