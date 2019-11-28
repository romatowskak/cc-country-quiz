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
const scoreImg = document.getElementById('scoreContainer');

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
        console.log("Correct answer");
        

        // change progress color to green
        // // Mariusz
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        // Mariusz
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
    scoreImg.style.display = 'block';
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
    
    let button_node = document.createElement("button");
    let button_text = document.createTextNode("AGAIN");
    button_node.appendChild(button_text);
    scoreImg.appendChild(button_node);

    button_node.addEventListener("click", function() {
        location.reload()
    });
}
