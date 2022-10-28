import '../pages/index.css';

import {
  profileName,
  profileStatus,
  profileAvatar,
  profileAvatarOverlay,
  profileButtonAdd,
  profileButtonEdit,
  initialCards,
  validationSettings,
  formValidators
}
from '../scripts/utils/constants.js'

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithDialoge from '../scripts/components/PopupWithDialoge.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const userInfo = new UserInfo({ name: profileName, status: profileStatus }, '.profile__avatar');

const gallerySection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data.place, data.link, '#gallery__card', handleCardClick, handleCardDelete).generateCard();
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

const popupAvatar = new PopupWithForm('.change-avatar-popup', (inputValues) => {
  userInfo.changeUserAvatar(inputValues);
  popupAvatar.close();
});
popupAvatar.setEventListeners();

const popupDeleteCard = new PopupWithDialoge('.delete-card-popup');
popupDeleteCard.setEventListeners();

const popupFullview = new PopupWithImage('.popup_type_fullview');
popupFullview.setEventListeners();

function handleCardClick(place, link) {
  popupFullview.open(place, link);
}

function handleCardDelete(card) {
  popupDeleteCard.open();
  popupDeleteCard.confirmAction(card.deleteCard);
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

profileAvatar.addEventListener('mouseover', () => {
  profileAvatarOverlay.classList.add('profile__avatar-overlay_visible');
});

profileAvatarOverlay.addEventListener('click', () => {
  formValidators['change-avatar'].resetValidation();
  popupAvatar.open();
});

profileAvatarOverlay.addEventListener('mouseout', () => {
  profileAvatarOverlay.classList.remove('profile__avatar-overlay_visible');
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




