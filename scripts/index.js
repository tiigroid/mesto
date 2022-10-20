import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'button_type_submit-disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const initialCards = [
  {
    place: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1488278905738-514111aa236c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    place: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1504064860048-974c8788c612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    place: 'Морро Бэй',
    link: 'https://images.unsplash.com/photo-1597839271116-399cd739ddb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    place: 'Кейп-Бретон',
    link: 'https://images.unsplash.com/photo-1540913570178-23a49e4e8616?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    place: 'Сан-Диего',
    link: 'https://images.unsplash.com/photo-1609994819063-e8de7339880b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    place: 'Залив Файерс',
    link: 'https://images.unsplash.com/photo-1597762453091-4467f4b15761?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
];

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');

const popupFullview = document.querySelector('.popup_type_fullview');

const popupFormEdit = document.querySelector('.popup__form_type_edit');
const popupFormEditInputName = document.querySelector('.popup__input_type_name');
const popupFormEditInputStatus = document.querySelector('.popup__input_type_status');

const popupFormAdd = document.querySelector('.popup__form_type_add');
const popupFormAddInputPlace = document.querySelector('.popup__input_type_place');
const popupFormAddInputLink = document.querySelector('.popup__input_type_link');

const gallery = document.querySelector('.gallery');

new FormValidator(validationSettings, popupFormEdit).enableValidation();
new FormValidator(validationSettings, popupFormAdd).enableValidation();

initialCards.forEach((card) => {
  const initialCard = new Card(card.place, card.link, '#gallery__card').makeCard();
  initialCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('gallery__image')) {
    openPopup(popupFullview)
    }
  });
  addCard(initialCard);
});

function addCard(cardToAdd) {
  gallery.prepend(cardToAdd);
}

function openPopup(popup) {
  popup.closest('.popup').classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function fillPopupFormEdit() {
  popupFormEditInputName.value = profileName.textContent;
  popupFormEditInputStatus.value = profileStatus.textContent;
}

function changeProfile() {
  profileName.textContent = popupFormEditInputName.value;
  profileStatus.textContent = popupFormEditInputStatus.value;
}

profileButtonEdit.addEventListener('click', () => {
  fillPopupFormEdit();
  openPopup(popupFormEdit);
});

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupFormAdd);
});

popupFormEdit.addEventListener('submit', (evt) => {
  changeProfile();
  closePopup(evt.target);
});

popupFormAdd.addEventListener('submit', (evt) => {
  const newGalleryCard = new Card(popupFormAddInputPlace.value, popupFormAddInputLink.value, '#gallery__card').makeCard();
  newGalleryCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('gallery__image')) {
    openPopup(popupFullview)
    }
  });
  addCard(newGalleryCard);
  closePopup(evt.target);
  evt.target.reset();
  if (popupFormAddInputPlace.value === '' || popupFormAddInputLink.value === '') {
    evt.submitter.classList.add(validationSettings.inactiveButtonClass);
    evt.submitter.disabled = true;
  };
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
});
});
