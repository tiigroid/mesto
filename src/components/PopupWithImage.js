import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector, place, link) {
    super(popupSelector);
    this._place = place;
    this._link = link;
  }

  open() {
    super.open();
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._place;
    document.querySelector('.popup__caption').textContent = this._place;
  }
}
