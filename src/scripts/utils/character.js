class CharacterApp {
  constructor() {
    this._minNumber = 1;
    this._maxNumber = 26;
    this._baseCharNumber = 64;
  }

  _getRandomNumber() {
    return Math.floor(Math.random() * this._maxNumber) + this._minNumber;
  }

  getCharacter() {
    return String.fromCharCode(64 + this._getRandomNumber());
  }
}

export default CharacterApp;
