const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'button_type_submit-disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);

function showPopupInputError(popupForm, popupInput, errorMessage, validationSettings) {
  const inputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(validationSettings.inputErrorClass);
  inputError.classList.add(validationSettings.errorClass);
  inputError.textContent = errorMessage;
};

function hidePopupInputError(popupForm, popupInput, validationSettings) {
  const inputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(validationSettings.inputErrorClass);
  inputError.classList.remove(validationSettings.errorClass);
  inputError.textContent = '';
};

function validateInput(popupForm, popupInput) {
  if (!popupInput.validity.valid) {
    showPopupInputError(popupForm, popupInput, popupInput.validationMessage, validationSettings);
  } else {
    hidePopupInputError(popupForm, popupInput, validationSettings);
  }
};

function setEventListeners(popupForm, validationSettings) {
  const popupInputs = Array.from(popupForm.querySelectorAll(validationSettings.inputSelector));
  const popupButtonSubmit = popupForm.querySelector(validationSettings.submitButtonSelector);
  toggleSubmitButton(popupInputs, popupButtonSubmit, validationSettings);
  popupInputs.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      validateInput(popupForm, popupInput);
      toggleSubmitButton(popupInputs, popupButtonSubmit, validationSettings);
    });
  });
};

function enableValidation(validationSettings) {
  const popupForms = Array.from(document.querySelectorAll(validationSettings.formSelector));
  popupForms.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupForm, validationSettings);
  });
};

function validateAllInputs(popupInputs) {
  return popupInputs.some((popupInput) => {
    return !popupInput.validity.valid;
  })
};

function toggleSubmitButton (popupInputs, popupButtonSubmit, validationSettings) {
  if (validateAllInputs(popupInputs)) {
    popupButtonSubmit.classList.add(validationSettings.inactiveButtonClass);
  } else {
    popupButtonSubmit.classList.remove(validationSettings.inactiveButtonClass);
  }
};
