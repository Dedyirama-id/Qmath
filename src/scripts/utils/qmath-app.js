class Qmath {
  constructor(level) {
    this._level = level;
    this._minNumber = 10 ** (this._level - 1);
    this._maxNumber = 10 ** this._level;
  }

  getRandomNumber(min = this._minNumber, max = this._maxNumber) {
    return Math.floor(Math.random() * max) + min;
  }

  getAddition() {
    const rangeNumberList = [{ min: 2, max: 10 }, { min: 11, max: 100 }, { min: 101, max: 1000 }, { min: 10001, max: 10000 }];
    const selectedRangeNumber = rangeNumberList[this._level - 1];
    const a = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);
    const b = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);

    return {
      eq: `${a} + ${b}`,
      ans: a + b,
    };
  }

  getSubstraction() {
    const rangeNumberList = [{ min: 2, max: 10 }, { min: 11, max: 100 }, { min: 101, max: 1000 }, { min: 10001, max: 10000 }];
    const selectedRangeNumber = rangeNumberList[this._level - 1];

    const a = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);
    let b = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);
    while (a === b) { b = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max); }

    return {
      eq: `${a} - ${b}`,
      ans: a - b,
    };
  }

  getMultiplication() {
    const rangeNumberList = [{ min: 2, max: 10 }, { min: 11, max: 20 }, { min: 21, max: 100 }, { min: 101, max: 1000 }];
    const selectedRangeNumber = rangeNumberList[this._level - 1];

    const a = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);
    const b = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);

    return {
      eq: `${a} x ${b}`,
      ans: a * b,
    };
  }

  getDivision() {
    const rangeNumberList = [{ min: 2, max: 10 }, { min: 11, max: 20 }, { min: 21, max: 100 }, { min: 101, max: 1000 }];
    const selectedRangeNumber = rangeNumberList[this._level - 1];

    const a = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);
    const ans = this.getRandomNumber(selectedRangeNumber.min, selectedRangeNumber.max);

    return {
      eq: `${ans * a} : ${a}`,
      ans,
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

export default Qmath;
