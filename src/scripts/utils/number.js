class NumberApp {
  constructor(level) {
    this._level = level;
    this._minNumber = 10 ** (this._level - 1);
    this._maxNumber = 10 ** this._level;

    this._getRandomNumber = this._getRandomNumber.bind(this);
  }

  _getRandomNumber() {
    return Math.floor(Math.random() * this._maxNumber) + this._minNumber;
  }

  getAddition() {
    const a = this._getRandomNumber();
    const b = this._getRandomNumber();

    return {
      eq: `${a} + ${b}`,
      ans: a + b,
    };
  }

  getSubstraction() {
    const a = this._getRandomNumber();
    const b = this._getRandomNumber();

    return {
      eq: `${a} - ${b}`,
      ans: a - b,
    };
  }

  getMultiplication() {
    const a = this._getRandomNumber();
    const b = this._getRandomNumber();

    return {
      eq: `${a} x ${b}`,
      ans: a * b,
    };
  }

  getDivision() {
    const a = this._getRandomNumber();
    const b = this._getRandomNumber();

    return {
      eq: `${a} : ${b}`,
      ans: a / b,
    };
  }
}

export default NumberApp;
