import '../pages/index.css';

import {
  profileName,
  profileStatus,
  profileButtonAdd,
  profileButtonEdit,
  popupFormAdd,
  popupFormEdit,
  popupFormEditInputName,
  popupFormEditInputStatus,
  initialCards,
  validationSettings
}
from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupFormAddValidator = new FormValidator(validationSettings, popupFormAdd);
const popupFormEditValidator = new FormValidator(validationSettings, popupFormEdit);

const userInfo = new UserInfo({ name: profileName, status: profileStatus });

const gallerySection = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = createCard(item.place, item.link);
    gallerySection.addItem(initialCard);
    }
  },
  '.gallery'
);

const popupEdit = new PopupWithForm('.popup__form_type_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
})

const popupAdd = new PopupWithForm('.popup__form_type_add', (inputValues) => {
  const newCard = createCard(inputValues['place-input'], inputValues['link-input']);
  gallerySection.addItem(newCard);
  popupAdd.close();
 });

function createCard(place, link) {
  const card = new Card(place, link, '#gallery__card', handleCardClick).generateCard();
  return card;
}

function handleCardClick(place, link) {
  const fullViewPopup = new PopupWithImage('.popup__fullview', place, link);
  fullViewPopup.setEventListeners();
  fullViewPopup.open();
}

function fillPopupFormEdit() {
  const formValues = userInfo.getUserInfo();
  popupFormEditInputName.value = formValues.name;
  popupFormEditInputStatus.value = formValues.status;
}

profileButtonEdit.addEventListener('click', () => {
  fillPopupFormEdit();
  popupFormEditValidator.resetValidation();
  popupEdit.open();
});

profileButtonAdd.addEventListener('click', () => {
  popupFormAddValidator.resetValidation();
  popupAdd.open();
});

popupFormAddValidator.enableValidation();
popupFormEditValidator.enableValidation();
gallerySection.renderItems();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
