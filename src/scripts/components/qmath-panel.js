import Qmath from '../utils/qmath-app';
import Stopwatch from '../utils/stopwatch';

// // TODO: Fix Bug cannot answer when correct answer is 0
// // TODO: Show Error when starting at no config
// // TODO: Disable config button when app starting

class QmathPanel extends HTMLElement {
  constructor() {
    super();
    this._isCounting = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 overflow-hidden">
        <div class="w-full bg-neutral rounded-2xl px-4 py-3 flex flex-col gap-2">
          <div class="text-neutral-content opacity-50">
            <i class="fa-solid fa-stopwatch"></i>
            <div id="stopwatch" class="countdown font-mono text-sm rounded-sm p-1">
              <span id="mm" style="--value:0;"></span>:
              <span id="ss" style="--value:0;"></span>
            </div>
            <div class="divider m-0"></div>
          </div>
          <pre><code id="question-block" class="inline-block w-full text-center align-middle"></code></pre>
        </div>
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Answer</span>
            </label>
            <input id="answer" type="number" placeholder="Your answer in number..." class="input input-bordered"/>
          </div>
          <div class="form-control mt-6">
            <button id="start-button" class="btn btn-primary">Start Counting</button>
          </div>
        </form>
      </div>
    `;
    this.startButton = document.getElementById('start-button');
    this.answerInput = document.getElementById('answer');
    this.questionBlock = document.getElementById('question-block');
    this.stopWatchElement = document.getElementById('stopwatch');

    this._stopwatch = new Stopwatch({
      mm: this.stopWatchElement.children[0],
      ss: this.stopWatchElement.children[1],
    });

    this.answerInput.disabled = true;
    this._changeStartButtonStatus();

    this.startButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._isCounting = !this._isCounting;
      if (this._isCounting === false) {
        this._changeStartButtonStatus();
        this.questionBlock.innerText = '';

        const configurationDrawer = document.querySelector('configuration-drawer');
        configurationDrawer.enabled();

        this.answerInput.value = '';
        this.answerInput.disabled = true;

        this._stopwatch.stop();
      } else {
        this.renderNewQuestion();
      }
    });

    this.answerInput.addEventListener('input', () => {
      if (this._currentQuestion.eq && this._currentQuestion.ans) {
        if (parseInt(this.answerInput.value, 10) === this._currentQuestion.ans) {
          this.answerInput.value = '';
          this.renderNewQuestion();
        }
      }
    });
  }

  _changeStartButtonStatus() {
    if (this._isCounting) {
      this.startButton.classList.replace('btn-primary', 'btn-warning');
      this.startButton.innerText = 'Finish Counting';
    } else {
      this.startButton.classList.replace('btn-warning', 'btn-primary');
      this.startButton.innerText = 'Start Counting';
    }
  }

  renderNewQuestion() {
    const configurationDrawer = document.querySelector('configuration-drawer');
    const appConfig = configurationDrawer.config;

    if (!appConfig.error) {
      const app = new Qmath(appConfig.level);
      this._currentQuestion = app.getQuestion(appConfig.options);

      configurationDrawer.disabled();
      this.answerInput.disabled = false;

      this.questionBlock.innerHTML = '';
      this.questionBlock.innerHTML = this._currentQuestion.eq;
      this._changeStartButtonStatus();
      this.answerInput.focus();

      this._stopwatch.reset();
      this._stopwatch.start();
    } else {
      configurationDrawer.error = appConfig.error;
      this._isCounting = false;
    }
  }
}

customElements.define('qmath-panel', QmathPanel);
