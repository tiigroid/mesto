import '../pages/index.css';

import {
  profileName,
  profileStatus,
  profileButtonAdd,
  profileButtonEdit,
  initialCards,
  validationSettings,
  formValidators
}
from '../utils/constants.js'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({ name: profileName, status: profileStatus });

const gallerySection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data.place, data.link, '#gallery__card', handleCardClick).generateCard();
    gallerySection.addItem(card);
    }
  },
  '.gallery'
);
gallerySection.renderItems();

const popupEdit = new PopupWithForm('.edit-profile-popup', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.add-card-popup', (inputValues) => {
  gallerySection.renderItem(inputValues);
  popupAdd.close();
 });
popupAdd.setEventListeners();

const popupFullview = new PopupWithImage('.popup_type_fullview');
popupFullview.setEventListeners();

function handleCardClick(place, link) {
  popupFullview.open(place, link);
}

profileButtonEdit.addEventListener('click', () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  formValidators['edit-profile'].resetValidation();
  popupEdit.open();
});

profileButtonAdd.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupAdd.open();
});

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




