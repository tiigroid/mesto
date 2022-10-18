export class FormValidator {
  constructor(settings, popupForm) {
    this._settings = settings;
    this._popupForm = popupForm;
  }

  enableValidation() {
      this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(this._popupForm, this._settings);
  };

  _setEventListeners(popupForm, settings) {
    const popupInputs = Array.from(popupForm.querySelectorAll(settings.inputSelector));
    const popupButtonSubmit = popupForm.querySelector(settings.submitButtonSelector);
    this._toggleSubmitButton(popupInputs, popupButtonSubmit, settings);
    popupInputs.forEach((popupInput) => {
      popupInput.addEventListener('input', () => {
        this._validateInput(popupForm, popupInput, settings);
        this._toggleSubmitButton(popupInputs, popupButtonSubmit, settings);
      });
    });
  };

  _validateInput(popupForm, popupInput, settings) {
    if (!popupInput.validity.valid) {
      this._showPopupInputError(popupForm, popupInput, popupInput.validationMessage, settings);
    } else {
      this._hidePopupInputError(popupForm, popupInput, settings);
    }
  };

  _showPopupInputError(popupForm, popupInput, errorMessage, settings) {
    const inputError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(settings.inputErrorClass);
    inputError.classList.add(settings.errorClass);
    inputError.textContent = errorMessage;
  };

  _hidePopupInputError(popupForm, popupInput, settings) {
    const inputError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(settings.inputErrorClass);
    inputError.classList.remove(settings.errorClass);
    inputError.textContent = '';
  };

  _toggleSubmitButton (popupInputs, popupButtonSubmit, settings) {
    if (this._validateAllInputs(popupInputs)) {
      popupButtonSubmit.classList.add(settings.inactiveButtonClass);
      popupButtonSubmit.disabled = true;
    } else {
      popupButtonSubmit.classList.remove(settings.inactiveButtonClass);
      popupButtonSubmit.disabled = false;
    }
  };

  _validateAllInputs(popupInputs) {
    return popupInputs.some((popupInput) => {
      return !popupInput.validity.valid;
    })
  };
}
