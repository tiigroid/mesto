import '../pages/index.css';

import saintPetersburg from '../images/place_saint-petersburg.png';
import newZeland from '../images/place_new-zealand.png';
import morroBay from '../images/place_morro-bay.png';
import capeBreton from '../images/place_cape-breton.png';
import sanDiego from '../images/place_san-diego.png';
import bayOfFires from '../images/place_bay-of-fires.png';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';

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
    link: saintPetersburg,
  },
  {
    place: 'Новая Зеландия',
    link: newZeland,
  },
  {
    place: 'Морро Бэй',
    link: morroBay,
  },
  {
    place: 'Кейп-Бретон',
    link: capeBreton,
  },
  {
    place: 'Сан-Диего',
    link: sanDiego,
  },
  {
    place: 'Залив Файерс',
    link: bayOfFires,
  },
];

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');

const popupFullview = document.querySelector('.popup_type_fullview');
const popupFullviewImage = document.querySelector('.popup__image');
const popupFullviewCaption = document.querySelector('.popup__caption');

const popupFormEdit = document.querySelector('.popup__form_type_edit');
const popupFormEditInputName = document.querySelector('.popup__input_type_name');
const popupFormEditInputStatus = document.querySelector('.popup__input_type_status');

const popupFormAdd = document.querySelector('.popup__form_type_add');
const popupFormAddInputPlace = document.querySelector('.popup__input_type_place');
const popupFormAddInputLink = document.querySelector('.popup__input_type_link');

const gallery = document.querySelector('.gallery');

const formValidators = {};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(settings, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

initialCards.forEach((card) => {
  const initialCard = createCard(card.place, card.link);
  addCard(initialCard);
});

function createCard(place, link) {
  const card = new Card(place, link, '#gallery__card', handleCardClick).generateCard();
  return card;
}

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

function handleCardClick(place, link) {
  popupFullviewImage.src = link;
  popupFullviewImage.alt = place;
  popupFullviewCaption.textContent = place;
  openPopup(popupFullview);
}

profileButtonEdit.addEventListener('click', () => {
  fillPopupFormEdit();
  openPopup(popupFormEdit);
  formValidators[popupFormEdit.getAttribute('name')].resetValidation();
});

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupFormAdd);
  formValidators[popupFormAdd.getAttribute('name')].resetValidation();
});

popupFormEdit.addEventListener('submit', (evt) => {
  changeProfile();
  closePopup(evt.target);
});

popupFormAdd.addEventListener('submit', (evt) => {
  const newCard = createCard(popupFormAddInputPlace.value, popupFormAddInputLink.value);
  addCard(newCard);
  closePopup(evt.target);
  evt.target.reset();
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
