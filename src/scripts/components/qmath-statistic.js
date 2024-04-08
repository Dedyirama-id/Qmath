import calculateScore from '../utils/score-calculation';

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="stat-title">Answered</div>
          <div id="answered" class="stat-value">-</div>
          <div class="stat-desc">Questions</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div class="stat-title">Average Time</div>
          <div id="average-time" class="stat-value">-</div>
          <div class="stat-desc">⏱seconds (avg. 5s)</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
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
