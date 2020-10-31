
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start_button");
var startPage = document.getElementById("quiz_intro");


var timeDisplay = document.getElementById('timer')
var main = document.getElementsByTagName('main')[0]
var viewHighscoreLink = document.getElementById('view_highscore_link')
var questionNumbersBox = document.getElementById('question_numbers_box')
var quiz_page = document.getElementById("question_page")
var questionDisplay = document.getElementById('question_display')
var answersList = document.getElementById('answer_list')
var firstAnswer = document.getElementById('answer1')
var secondAnswer = document.getElementById('answer2')
var thirdAnswer = document.getElementById('answer3')
var fourthAnswer = document.getElementById('answer4')
var answerFeedback = document.getElementById('feedback')
var scoreDisplay = document.getElementById('score_display')
var namePage = document.getElementById('get_name_page')
var initialsInput = document.getElementById('initials_input')
var submitInitialsButton = document.getElementById('submit_initials_button')
var highscorePage = document.getElementById('highscore_page')
var highscoreList = document.getElementById('highscore_list')
var goToStartingPageButton = document.getElementById('go_to_starting_page_button')
var clearHighscoresButton = document.getElementById('clear_highscores_button')


var startingTime = 75;
var subtractedTime = 10;
var intervalTimer;
var timeLeft; 
var score;
var quizOver = false



// Quiz multiple choice questions
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
        "answers": ["if(x 2)","if x=2","if(x!=2)","if(x==2) { }"],
        "correct":3

    },{
        "question": "When assigning to a variable, the values of type 'String' are enclosed with:",
        "answers": ["parentheses","curly brackets","quotes","commas"],
        "correct": 2
    }, {
        "question": "Which of the following is a good debugging tool during the code development?",
        "answers": ["google.com","console.log","StackOverflow","gitHub"],
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
        "question": "For loop is enclosed with the following:",
        "answers": ["quotes","curly brackets","square brackets","parentheses"],
        "correct": 3
    }
]





// var i = 0;


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


function randomizeArray(array) {
    array_copy = [...array]
    result = []
    while (array_copy.length > 0) {
        let r = Math.floor(Math.random() * array_copy.length);
        let i = array_copy.splice(r, 1)[0]
        result.push(i)
    }
    return result
}

var nextQuestionIndex 
var randomizedQuestions 

/** Display the questions page. */
function displayQuestionPage() {

    quiz_page.classList.remove("hidden");

    // create a randomly sorted clone of the questions array to use for this quiz
    randomizedQuestions = randomizeArray(questions)

    // reset the values to back to their defaults
    nextQuestionIndex = 0
    score = 0
    question_number = 0

    // start the timer
    // startQuiz()

    // setup the first question
    showQuestion(question_number)
}

var question_number = 0
var score = 0
var finalScore = 0

function showQuestion(question_index){
    questionDisplay.textContent = questions[question_index].question;
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
            answerFeedback.textContent = "Correct"
        }
        else {
            console.log("Incorrect!")
            answerFeedback.textContent = "Incorrect"
            timeLeft-=subtractedTime
        }
        question_number++
        showQuestion(question_number)
        setTimeout(function(){ answerFeedback.textContent=""; }, 1500);

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
    scoreDisplay.textContent = finalScore

}


function renderScores(event){
    event.preventDefault();
    namePage.classList.add("hidden")
    highscorePage.classList.remove("hidden")

    var show_scores = {
        initials: initialsInput.value.trim(),
        score:finalScore
    };
    console.log(show_scores)

    localStorage.setItem("show_scores", JSON.stringify(show_scores));
    var lastSubmission = JSON.parse(localStorage.getItem("show_scores"));
    highscoreList.textContent = lastSubmission.initials + ", score: " +lastSubmission.score;
    localStorage.getItem(finalScore);
    
}

function goToStart(){
    highscorePage.classList.add("hidden")
    // startPage.classList.add("start_page")
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
        highscoreList.textContent = "Scores cleared";
    }
}


startButton.addEventListener("click", quizTime);
startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", displayQuestionPage);
answersList.addEventListener("click", nextQuestion);
submitInitialsButton.addEventListener("click", renderScores);
goToStartingPageButton.addEventListener("click", goToStart);
clearHighscoresButton.addEventListener("click", clearYourScore);







































