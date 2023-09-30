function Questions(question, options, answer) {
    this.question = question,
        this.options = options,
        this.answer = answer
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
}

Quiz.prototype.checkAnswer = function (ans) {
    if (this.questions[this.currentIndex].answer === ans) {
        this.score++;
    }

    this.currentIndex++;
}

const questions = [new Questions("JavaScript is the programming language of the _____.", ["Desktop", "Mobile", "Web", "Server"], "Web"),
new Questions("JavaScript ignores?", ["spaces", "newlines", "tabs", "All of the above"], "All of the above"),
new Questions("Which JavaScript method is used to access an HTML element by id?", ["getElementById()", "getElement(id)", "getElementById(id)", "elementById(id)"], "getElementById(id)"),
new Questions("Which JavaScript method is used to write into an alert box?", ["window.alertHTML()", "window.alert()", "window.alertBox()", "window.alertContent()"], "window.alert()"),
new Questions("Which JavaScript keyword is used to declare a variable?", ["Var", "var", "Let", "All of the above"], "var"),
new Questions("Which of the following is not javascript data types?", ["Null", "Undefined", "Number", "All of the above"], "All of the above"),
new Questions("Which of the following object is the main entry point to all client-side JavaScript features and APIs?", ["Position", "Window", "Locaiton", "Standard"], "Window")];

const quiz = new Quiz(questions);
let q = document.getElementById('question');

function loadQuestion() {

    if (isQuizEnd()) {
        showResult();
    } else {
        q.innerText = questions[quiz.currentIndex].question;
        showProgress(quiz.currentIndex, questions.length);
        loadOptions(questions[quiz.currentIndex]);
    }
}

function showResult() {

    let result = document.getElementById('quiz');
    const percentage = quiz.score / questions.length * 100;
    result.innerHTML = `<h1> Result</h1><h2 id='score'>Your Score:${quiz.score}<br><br>Your Percentage:${percentage}%</h2>`;
}

function isQuizEnd() {
    if (quiz.currentIndex < questions.length) {
        return false;
    }
    return true;
}

function showProgress(index, length) {
    let progress = document.getElementById('progress');
    progress.innerHTML = `Question ${index} of ${length}`;
}

function loadOptions(question) {
    let choice;
    for (let i = 0; i < question.options.length; i++) {
        choice = document.getElementById('choice' + i);
        choice.innerText = question.options[i];

        choiceEvent('btn' + i, question.options[i]);
    }

}

function choiceEvent(id, ans) {

    let button = document.getElementById(id);
    button.onclick = () => {
        quiz.checkAnswer(ans);
        loadQuestion();
    }
}
