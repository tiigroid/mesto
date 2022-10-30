export default class Card {
  constructor(templateSelector, data, api, cardHandlers) {
    this._templateSelector = templateSelector;

    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;

    this._api = api;

    this._handleCardClick = cardHandlers.handleCardClick;
    this._handleCardDelete = cardHandlers.handleCardDelete;

    this.deleteCard = this.deleteCard.bind(this);
  }


  generateCard() {
    this._galleryCard = this._getTemplate();

    this._galleryImage = this._galleryCard.querySelector('.gallery__image');
    this._galleryTitle = this._galleryCard.querySelector('.gallery__title');
    this._likeValue = this._galleryCard.querySelector('.gallery__like');
    this._likeButton = this._galleryCard.querySelector('.gallery__button-like');
    this._deleteButton = this._galleryCard.querySelector('.gallery__button-delete');

    this._api.getUserData()
    .then((data) => {

        if(this._owner !== data._id)  {
          this._deleteButton.remove();
        }

        this._likes.some((like) => {
          if(like._id === data._id) {
            this._likeButton.classList.add('button_type_liked')
          }
        })
    })
    .catch((err) => alert(err));

    this._galleryTitle.textContent = this._name;
    this._likeValue.textContent = this._likes.length;
    this._galleryImage.alt = this._name;
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
      this._handleCardDelete(this);
    });
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    this._galleryImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  deleteCard() {
    this._api.deleteCard(this._id)
    .then(() => this._galleryCard.closest('.gallery__card').remove())
    .catch((err) => alert(err));
  }


  _toggleLike() {
    if(this._likeButton.classList.contains('button_type_liked')) {
      this._api.deleteCardLike(this._id)
      .then((res) => {
        this._likeValue.textContent = res.likes.length
      })
      .then(() => {
        this._likeButton.classList.toggle('button_type_liked')
      })
      .catch((err) => alert(err));
    } else {
      if(!this._likeButton.classList.contains('button_type_liked')) {
        this._api.putCardLike(this._id)
        .then((res) => {
          this._likeValue.textContent = res.likes.length
      })
      .then(() => {
        this._likeButton.classList.toggle('button_type_liked')
      })
      .catch((err) => alert(err));
      }
    }
  }
}
