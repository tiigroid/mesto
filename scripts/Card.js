import { openPopup } from './index.js';

const popupFullview = document.querySelector('.popup_type_fullview');
const popupFullviewImage = document.querySelector('.popup__image');
const popupFullviewCaption = document.querySelector('.popup__caption');

export class Card {
  constructor(place, link, templateSelector) {
    this._place = place;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._galleryCard = this._getTemplate();

    this._galleryImage = this._galleryCard.querySelector('.gallery__image');
    this._galleryTitle = this._galleryCard.querySelector('.gallery__title');
    this._likeButton = this._galleryCard.querySelector('.gallery__button-like');
    this._deleteButton = this._galleryCard.querySelector('.gallery__button-delete');

    this._galleryTitle.textContent = this._place;
    this._galleryImage.alt = this._place;
    this._galleryImage.src = this._link;

    this._setEventListeners();

    return this._galleryCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.gallery__card').cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    this._galleryImage.addEventListener('click', () => {
      this._openFullview();
    });
  }

  _deleteCard() {
    this._galleryCard.closest('.gallery__card').remove();
  }

  _toggleLike() {
    this._likeButton.classList.toggle('button_type_liked');
  }

  _openFullview() {
    popupFullviewImage.src = this._link;
    popupFullviewImage.alt = this._place;
    popupFullviewCaption.textContent = this._place;
    openPopup(popupFullview);
  }
}


