class Stopwatch {
  constructor({
    mm, ss,
  }) {
    this._watchElement = {
      minutes: mm,
      seconds: ss,
    };
    this.reset();
  }

  get timeCount() {
    const timeCount = Date.now() - this._startTime;
    this.reset();
    return timeCount;
  }

  start() {
    this._startTime = Date.now();
    this._timer = setInterval(() => {
      const elapsedTime = Date.now() - this._startTime;
      const minutes = Math.floor((elapsedTime % 3600000) / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);

      this._setView(minutes, seconds);
    }, 1000);
  }

  stop() {
    clearInterval(this._timer);
    this.reset();
  }

  reset() {
    clearInterval(this._timer);
    this._setView();
  }

  _setView(minutesValue = 0, secondsValue = 0) {
    this._watchElement.minutes.innerText = (minutesValue < 10) ? `0${minutesValue}` : minutesValue;
    this._watchElement.seconds.innerText = (secondsValue < 10) ? `0${secondsValue}` : secondsValue;
  }
}

export default Stopwatch;
