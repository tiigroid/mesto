export default class Card {
  constructor(templateSelector, data, cardHandlers, thisUser) {
    this._templateSelector = templateSelector;

    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;

    this._user = thisUser;

    this._handleCardClick = cardHandlers.handleCardClick;
    this._handleCardDelete = cardHandlers.handleCardDelete;
    this._putLike = cardHandlers.putCardLike;
    this._deleteLike = cardHandlers.deleteCardLike;
  }

  generateCard() {
    this._galleryCard = this._getTemplate();

    this._galleryImage = this._galleryCard.querySelector('.gallery__image');
    this._galleryTitle = this._galleryCard.querySelector('.gallery__title');
    this._likeValue = this._galleryCard.querySelector('.gallery__like');
    this._likeButton = this._galleryCard.querySelector('.gallery__button-like');
    this._deleteButton = this._galleryCard.querySelector('.gallery__button-delete');

    this._galleryTitle.textContent = this._name;
    this._galleryImage.alt = this._name;
    this._galleryImage.src = this._link;
    this._likeValue.textContent = this._likes.length;

    if(this._owner !== this._user._id)  {
      this._deleteButton.remove();
    }

    this._likes.some(like => {
      if(like._id === this._user._id) {
      this._likeButton.classList.add('button_type_liked')
      }
    })

    this._setEventListeners();

    return this._galleryCard;
  }

  deleteCard() {
    this._galleryCard.closest('.gallery__card').remove();
  }

  renderLike(card) {
    this._likeValue.textContent = card.likes.length;
    this._likeButton.classList.toggle('button_type_liked');
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.gallery__card').cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this);
    });
    this._galleryImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _handleLike(card) {
    if(!this._likeButton.classList.contains('button_type_liked')) {
      this._putLike(card);
    } else {
      this._deleteLike(card);
    }
  }
}
