import calculateScore from '../utils/score-calculator';

class QmathStatistic extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set statsData(stats) {
    this._stats = stats;
    this._refreshStatsElement();
  }

  render() {
    this.innerHTML = `
      <div class="stats shadow">

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-circle-check text-2xl"></i>
          </div>
          <div class="stat-title">Answered</div>
          <div id="answered" class="stat-value">-</div>
          <div class="stat-desc">Questions</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-stopwatch text-2xl"></i>
          </div>
          <div class="stat-title">Average Time</div>
          <div id="average-time" class="stat-value">-</div>
          <div class="stat-desc">seconds (avg. 5s)</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-award text-2xl"></i>
          </div>
          <div class="stat-title">Score</div>
          <div id="score" class="stat-value">-</div>
          <div class="stat-desc">points (avg. 500)</div>
        </div>

      </div>
    `;
  }

  _refreshStatsElement() {
    this.querySelector('#answered').textContent = this._stats.answered;
    this.querySelector('#average-time').textContent = (this._stats.averageTime / 1000).toFixed(2);
    this.querySelector('#score').textContent = calculateScore(this._stats.answered, this._stats.averageTime).toFixed(0);
  }
}

customElements.define('qmath-statistic', QmathStatistic);
