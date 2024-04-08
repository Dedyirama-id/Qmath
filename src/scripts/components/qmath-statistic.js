import calculateScore from '../utils/score-calculator';

class QmathStatistic extends HTMLElement {
  set statsData(stats) {
    this._stats = stats;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="stats stats-vertical sm:stats-horizontal shadow">

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-circle-check text-2xl"></i>
          </div>
          <div class="stat-title">Answered</div>
          <div id="answered" class="stat-value">${this._stats.answered}</div>
          <div class="stat-desc">Questions</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-stopwatch text-2xl"></i>
          </div>
          <div class="stat-title">Average Time</div>
          <div id="average-time" class="stat-value">${(this._stats.averageTime / 1000).toFixed(2)}</div>
          <div class="stat-desc">seconds (avg. 5s)</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <i class="fa-solid fa-award text-2xl"></i>
          </div>
          <div class="stat-title">Score</div>
          <div id="score" class="stat-value">${calculateScore(this._stats.answered, this._stats.averageTime).toFixed(0)}</div>
          <div class="stat-desc">points (avg. 500)</div>
        </div>

      </div>
    `;
  }
}

customElements.define('qmath-statistic', QmathStatistic);
