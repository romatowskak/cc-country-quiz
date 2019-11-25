// render progress
import { questions } from './questions.js';
import { renderQuestion } from './quiz.js';


const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');
const progress = document.getElementById('progress');
const scoreDiv = document.getElementById('scoreContainer');

let lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let questionTime = 10; // s
let gaugeWidth = 150; // px
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

export function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + '></div>';
    }
}

// counter render
export function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + 'px';
        count++;
    } else {
        // this function should change the color of the circle to red
        // answerIsWrong();
        if (runningQuestion < lastQuestion) {
            count = 0;
            nextQuestion();
            
            //runningQuestion++;
            //renderQuestion();
        } else {
            // end the quiz and show the 
            clearInterval(TIMER);
            // Mariusz
            // scoreRender();
        }
    }
}

// score render
// Mariusz
// export function scoreRender() {}