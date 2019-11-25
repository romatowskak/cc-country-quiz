import { questions } from './questions.js';
import { renderCounter, renderProgress } from './renderer.js';

//  retrieving elements from the template (index.html)
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const qImg = document.getElementById('qImg');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');

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
        // answer is correct
        score++;
        
        // change progress color to green
        // // Mariusz
        // answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        // Mariusz
        // answerIsWrong();
    }
    nextQuestion();
}

window.nextQuestion = nextQuestion;

function nextQuestion() {
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        console.log("Running question: " + runningQuestion + "/" + lastQuestion);
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        // Mariusz
        // scoreRender();
    }
}

// when answer's correct
// export function answerIsCorrect() {}


// // when answer's wrong
// export function answerIsWrong() {}