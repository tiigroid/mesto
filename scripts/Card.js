export class Card {
  constructor(place, link, templateSelector) {
    this._place = place;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    const card = template.querySelector('.gallery__card').cloneNode(true);
    return card;
  }

  _setEventListeners() {
    this._galleryCard.querySelector('.gallery__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._galleryCard.querySelector('.gallery__button-like').addEventListener('click', () => {
      this._toggleLike();
    });
    this._galleryCard.querySelector('.gallery__image').addEventListener('click', () => {
      this._renderFullview();
    });
  }

  _deleteCard() {
    this._galleryCard.closest('.gallery__card').remove();
  }

  _toggleLike() {
    this._galleryCard.querySelector('.gallery__button-like').classList.toggle('button_type_liked');
  }

  _renderFullview() {
    const popupFullviewImage = document.querySelector('.popup__image');
    const popupFullviewCaption = document.querySelector('.popup__caption');
    popupFullviewImage.src = this._link;
    popupFullviewImage.alt = this._place;
    popupFullviewCaption.textContent = this._place;
  }

  makeCard() {
    this._galleryCard = this._getTemplate();
    this._setEventListeners();
    const galleryImage = this._galleryCard.querySelector('.gallery__image');
    const galleryTitle = this._galleryCard.querySelector('.gallery__title');
    galleryTitle.textContent = this._place;
    galleryImage.alt = this._place;
    galleryImage.src = this._link;
    return this._galleryCard;
  }
}



