import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.css';
import CountApp from './app';

const configurationForm = document.getElementById('configuration-form');
const questionBlock = document.getElementById('question-block');
const startButton = document.getElementById('start-button');
const answerInput = document.getElementById('answer');

let currentQuestion = {};

const validateStartApp = (configurationFormInput) => configurationFormInput.some((input) => input.checked);
const renderNewQuestion = () => {
  if (validateStartApp([...configurationForm])) {
    const app = new CountApp(localStorage.getItem('level'));
    const appConfig = JSON.parse(localStorage.getItem('appConfig'));
    currentQuestion = app.getQuestion(appConfig);

    questionBlock.innerHTML = '';
    questionBlock.innerHTML = currentQuestion.eq;
  }
};

if (localStorage.getItem('appConfig')) {
  const appConfig = JSON.parse(localStorage.getItem('appConfig'));
  configurationForm.addition.checked = appConfig.addition;
  configurationForm.substraction.checked = appConfig.substraction;
  configurationForm.multiplication.checked = appConfig.multiplication;
  configurationForm.division.checked = appConfig.division;
  configurationForm.character.checked = appConfig.character;
}

if (localStorage.getItem('level')) {
  configurationForm.level.value = localStorage.getItem('level');
}

configurationForm.addEventListener('change', () => {
  const appConfig = {
    addition: configurationForm.addition.checked,
    substraction: configurationForm.substraction.checked,
    multiplication: configurationForm.multiplication.checked,
    division: configurationForm.division.checked,
    character: configurationForm.character.checked,
  };
  localStorage.setItem('appConfig', JSON.stringify(appConfig));
  localStorage.setItem('level', configurationForm.level.value);
});

startButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (startButton.classList.contains('btn-primary')) {
    startButton.classList.remove('btn-primary');
    startButton.classList.add('btn-warning');
    startButton.innerText = 'Finish Counting';
    answerInput.focus();
    renderNewQuestion();
  } else {
    startButton.classList.remove('btn-warning');
    startButton.classList.add('btn-primary');
    startButton.innerText = 'Start Counting';
    questionBlock.innerHTML = '';
  }
});

answerInput.addEventListener('input', () => {
  if (currentQuestion && currentQuestion.ans) {
    if (parseInt(answerInput.value, 10) === currentQuestion.ans) {
      answerInput.value = '';
      renderNewQuestion();
    }
  }
});
