class CountApp {
  constructor(level) {
    this._level = level;
    this._minNumber = 10 ** (this._level - 1);
    this._maxNumber = 10 ** this._level;
  }

  getRandomNumber(min = this._minNumber, max = this._maxNumber) {
    return Math.floor(Math.random() * max) + min;
  }

  getAddition() {
    const a = this.getRandomNumber();
    const b = this.getRandomNumber();

    return {
      eq: `${a} + ${b}`,
      ans: a + b,
    };
  }

  getSubstraction() {
    const a = this.getRandomNumber();
    const b = this.getRandomNumber();

    return {
      eq: `${a} - ${b}`,
      ans: a - b,
    };
  }

  getMultiplication() {
    const a = this.getRandomNumber();
    const b = this.getRandomNumber();

    return {
      eq: `${a} x ${b}`,
      ans: a * b,
    };
  }

  getDivision() {
    const a = this.getRandomNumber();
    const b = this.getRandomNumber();

    return {
      eq: `${a} : ${b}`,
      ans: a / b,
    };
  }

  getCharacter() {
    const charNumber = this.getRandomNumber(1, 26);
    const char = String.fromCharCode(64 + charNumber);
    return {
      eq: char,
      ans: charNumber,
    };
  }

  getQuestion(operation = {
    addition: true,
    substraction: true,
    multiplication: true,
    division: true,
    character: true,
  }) {
    const operationArray = [];

    const getAdditionBound = this.getAddition.bind(this);
    const getSubstractionBound = this.getSubstraction.bind(this);
    const getMultiplicationBound = this.getMultiplication.bind(this);
    const getDivisionBound = this.getDivision.bind(this);
    const getCharacterBound = this.getCharacter.bind(this);

    if (operation.addition) {
      operationArray.push(getAdditionBound);
    }
    if (operation.substraction) {
      operationArray.push(getSubstractionBound);
    }
    if (operation.multiplication) {
      operationArray.push(getMultiplicationBound);
    }
    if (operation.division) {
      operationArray.push(getDivisionBound);
    }
    if (operation.character) {
      operationArray.push(getCharacterBound);
    }

    const randomIndex = Math.floor(Math.random() * operationArray.length);
    const randomFunction = operationArray[randomIndex];

    if (randomFunction) {
      return randomFunction();
    }

    return {
      eq: '',
      ans: 0,
    };
  }
}

export default CountApp;
