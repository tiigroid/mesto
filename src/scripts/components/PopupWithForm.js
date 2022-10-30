import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__window_form');
    this._inputValues = {};
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._defaultButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
}
