import Popup from './Popup.js';

export default class PopupWithDialoge extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__button-submit');
   }

  confirmAction(action) {
    this._confirmButton.addEventListener('click', () => {
      action();
      this.close();
    })
  }
}
