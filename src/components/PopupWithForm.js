import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputValues = {};
    this._inputValuesList = Array.from(this._popup.querySelectorAll('.popup__input'));
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
    this._inputValuesList.forEach((input) => {
      this._inputValues[input.getAttribute('id')] = input.value;
    })
    return this._inputValues;
  }
}
