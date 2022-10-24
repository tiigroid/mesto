export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.closest('.popup').classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose, { once: true });
  }

  close() {
    this._popup.closest('.popup').classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.closest('.popup').addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    };
  }
}
