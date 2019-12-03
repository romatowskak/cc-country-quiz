import { questions } from './questions.js';
import { renderCounter, renderProgress } from './renderer.js';
import { countryInfo }  from './countries.js';

//  retrieving elements from the template (index.html)
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const qImg = document.getElementById('qImg');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const scoreCon = document.getElementById('scoreContainer');
const scoreImg = document.getElementById('scoreImg');
const scoreBtn = document.getElementById('scoreBtn');
const scorePercent = document.getElementById('scorePercent');

// some variables

let lastQuestion = questions.length;
let runningQuestion = 0;
let count = 0;
let questionTime = 10; // 10s
let gaugeWidth = 150; // 150px
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// here we are rendering all the questions defined in the questions.js file
// running question is the index of the question object from question.js file
// Karola
export function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = '<p>' + q.question + '</p>';
    qImg.innerHTML = '<img src=' + q.imgSrc + '>';
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click', startQuiz);


// start quiz
function startQuiz() {
    start.style.display = 'none';
    renderQuestion();
    quiz.style.display = 'block';
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// checkAnswer
window.checkAnswer = checkAnswer;

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        console.log("Correct answer");
        answerIsCorrect();
    } else {
        answerIsWrong();
        console.log("Wrong answer");
    }
    nextQuestion();
}

window.nextQuestion = nextQuestion;

export function nextQuestion() {
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        console.log("Running question: " + runningQuestion + "/" + lastQuestion);
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        // Mariusz
        scoreRender();
    }
}

// when answer's correct
function answerIsCorrect() {
     countryInfo("United Kingdom");
    let index = runningQuestion.toString();
    let progCircle = document.getElementById(index);
    progCircle.style.backgroundColor = 'green';
}


// // when answer's wrong
function answerIsWrong() {
    let index = runningQuestion.toString();
    let progCircle = document.getElementById(index);
    progCircle.style.backgroundColor = 'red';
}

function scoreRender() {
    quiz.style.display = 'none';
    scoreCon.style.display = 'flex';
    let percentage_res = Math.round(score / lastQuestion * 100)
    
    // Diplay result %
    console.log(percentage_res + " %")

    if (percentage_res < 20) {
        scoreImg.innerHTML = "<img src=\"img/1.png\">";
    } else if (percentage_res < 40) {
        scoreImg.innerHTML = "<img src=\"img/2.png\">";
    } else if (percentage_res < 60) {
        scoreImg.innerHTML = "<img src=\"img/3.png\">";
    } else if (percentage_res < 80) {
        scoreImg.innerHTML = "<img src=\"img/4.png\">";
    } else {
        scoreImg.innerHTML = "<img src=\"img/5.png\">";
    };
    
    let button_node = document.createElement("p");
    let button_text = document.createTextNode("AGAIN");
    button_node.appendChild(button_text);
    scoreBtn.appendChild(button_node);

    scoreBtn.addEventListener("click", function() {
        location.reload()
    });

    let score_node = document.createElement("p");
    let p_text = document.createTextNode(percentage_res + "%");
    score_node.appendChild(p_text);
    scorePercent.appendChild(score_node);
}
