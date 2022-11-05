import Popup from './Popup.js';

export default class PopupWithDialoge extends Popup {
  constructor(popupSelector, processingMessage) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__button-submit');
    this._defaultButtonText = this._confirmButton.textContent;
    this._processingMessage = processingMessage;
   }

  setEventListeners() {
    super.setEventListeners()
    this._confirmButton.addEventListener('click', () => {
      this._handler();
    })
  }

  setNewHandler(action) {
    this._handler = action;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._confirmButton.textContent = this._processingMessage;
    } else {
      setTimeout(() => this._confirmButton.textContent = this._defaultButtonText, 200);
    }
  }
}
