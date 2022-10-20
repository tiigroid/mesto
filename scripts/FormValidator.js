export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }

  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
  };

  resetValidation() {
    this._toggleSubmitButton();
    this._inputList.forEach((input) => {
        this._hidePopupInputError(input)
      });
  }

  _setEventListeners() {
    this._toggleSubmitButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleSubmitButton();
      });
    });
  };

  _validateInput(input) {
    if (!input.validity.valid) {
      this._showPopupInputError(input, input.validationMessage);
    } else {
      this._hidePopupInputError(input);
    }
  };

  _showPopupInputError(input, errorMessage) {
    this._inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    this._inputError.classList.add(this._settings.errorClass);
    this._inputError.textContent = errorMessage;
  };

  _hidePopupInputError(input) {
    this._inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    this._inputError.classList.remove(this._settings.errorClass);
    this._inputError.textContent = '';
  };

  _toggleSubmitButton() {
    if (this._validateAllInputs()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _validateAllInputs() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };
}
