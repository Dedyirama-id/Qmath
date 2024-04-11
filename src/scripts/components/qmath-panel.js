import Qmath from '../utils/qmath-app';
import ScrollTo from '../utils/scroll-to';
import Stopwatch from '../utils/stopwatch';

// // TODO: Fix Bug cannot answer when correct answer is 0
// // TODO: Show Error when starting at no config
// // TODO: Disable config button when app starting

class QmathPanel extends HTMLElement {
  constructor() {
    super();
    this._isCounting = false;
    this._stats = {
      totalTime: 0,
      averageTime: 0,
      answered: 0,
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 overflow-hidden">
        <div class="w-full bg-neutral rounded-b-2xl px-4 py-3 flex flex-col gap-2">
          <div class="text-neutral-content opacity-50">
            <div class="flex justify-between">
              <div id="stopwatch" class="flex font-mono text-sm rounded-sm p-1 items-center gap-2 *:h-fit">
                <i class="fa-solid fa-stopwatch"></i>
                <span id="mm">00</span>:
                <span id="ss">00</span>
              </div>
              <div class="flex font-mono text-sm p-1 items-center gap-2">
                <i class="fa-solid fa-hashtag align-middle"></i>
                <span id="counter">0</span>
              </div>
            </div>
            <div class="divider m-0"></div>
          </div>
          <pre><code id="question-block" class="inline-block w-full text-center content-middle align-middle"></code></pre>
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
    this._statsElement = document.querySelector('qmath-statistic');

    this._stopwatch = new Stopwatch({
      mm: this.stopWatchElement.querySelector('#mm'),
      ss: this.stopWatchElement.querySelector('#ss'),
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
        if (this._stats.answered !== 0) this._statsElement.statsData = this._stats;
        this.querySelector('#counter').innerText = 0;
        ScrollTo.top();
      } else {
        this._stats = {
          totalTime: 0,
          averageTime: 0,
          answered: 0,
        };
        this.renderNewQuestion();
      }
    });

    this.answerInput.addEventListener('input', () => {
      if (this._currentQuestion.eq && this._currentQuestion.ans) {
        if (parseInt(this.answerInput.value, 10) === this._currentQuestion.ans) {
          this._stats.answered += 1;
          this.querySelector('#counter').innerText = this._stats.answered;
          this._stats.totalTime += this._stopwatch.timeCount;
          this._stats.averageTime = this._stats.totalTime / this._stats.answered;
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
      let grabbedQuestion = app.getQuestion(appConfig.options);
      while (this._currentQuestion && this._currentQuestion.ans === grabbedQuestion.ans) grabbedQuestion = app.getQuestion(appConfig.options);
      this._currentQuestion = grabbedQuestion;

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
