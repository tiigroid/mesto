import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popup.reset();
  }

  _getInputValues() {
    const inputValues = {};
    const inputValuesList = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputValuesList.forEach((input) => {
      inputValues[input.getAttribute('id')] = input.value;
    })
    return inputValues;
  }
}
