const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            { text: 'Delhi', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Pakistan', correct: false }
        ]
    },
    {
        question: 'Number of primitive data types in Java are?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true },
            { text: '3', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const result = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    time = 60;
    nextButton.classList.add('hidden');
    result.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    answerButtons.classList.remove('hidden');
    timer = setInterval(updateTime, 1000);
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.textContent = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.classList.add(button.dataset.correct === 'true' ? 'correct' : 'wrong');
        button.disabled = true;
    });
    nextButton.classList.remove('hidden');
}

function showResult() {
    clearInterval(timer);
    questionContainer.classList.add('hidden');
    answerButtons.classList.add('hidden');
    nextButton.classList.add('hidden');
    result.classList.remove('hidden');
    scoreElement.textContent = score;
}

function updateTime() {
    time--;
    timeElement.textContent = time;
    if (time <= 0) {
        showResult();
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
    } else {
        showResult();
    }
});

startQuiz();
