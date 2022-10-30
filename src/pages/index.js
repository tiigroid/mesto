import '../pages/index.css';

import {
  profileName,
  profileAbout,
  profileAvatar,
  profileAvatarOverlay,
  profileButtonAdd,
  profileButtonEdit,
  validationSettings,
  formValidators
}
from '../scripts/utils/constants.js'

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithDialoge from '../scripts/components/PopupWithDialoge.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '7f2b5ce8-c0a9-4e95-aae4-8d0e46f875cc',
    'Content-Type': 'application/json'
  }
});



// User Information

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar, api);
userInfo.setUserInfo();
userInfo.setUserAvatar();


// New Popups

const popupEditProfile = new PopupWithForm('.edit-profile-popup', (inputValues) => {
  popupEditProfile.renderLoading(true);
  api.patchUserData(inputValues)
  .then((data) => userInfo.renderUserInfo(data))
  .then(() => popupEditProfile.close())
  .catch((err) => alert(err))
  .finally(() => setTimeout(() => popupEditProfile.renderLoading(false), 200));
});
popupEditProfile.setEventListeners();


const popupAddCard = new PopupWithForm('.add-card-popup', (inputValues) => {
  popupAddCard.renderLoading(true);
  api.postCard(inputValues)
  .then((data) => {
    const card = new Card('#gallery__card', data, api, cardHandlers).generateCard();
    gallerySection.addItem(card);
  })
  .then(() => popupAddCard.close())
  .catch((err) => alert(err))
  .finally(() => setTimeout(() => popupAddCard.renderLoading(false), 200));
});
popupAddCard.setEventListeners();


const popupAvatar = new PopupWithForm('.change-avatar-popup', (inputValues) => {
  popupAvatar.renderLoading(true);
  api.patchUserAvatar(inputValues)
  .then((data) => userInfo.renderUserAvatar(data))
  .then(() => popupAvatar.close())
  .catch((err) => alert(err))
  .finally(() => setTimeout(() => popupAvatar.renderLoading(false), 200))
});
popupAvatar.setEventListeners();


const popupDeleteCard = new PopupWithDialoge('.delete-card-popup');
popupDeleteCard.setEventListeners();


const popupFullview = new PopupWithImage('.popup_type_fullview');
popupFullview.setEventListeners();


// New Sections

const gallerySection = new Section('.gallery', () => {
  api.getInitialCards()
  .then((data) => {
    const initialCards = data.reverse();
    initialCards.forEach((item) => {
    const card = new Card('#gallery__card', item, api, cardHandlers).generateCard();
    gallerySection.addItem(card);
    })
  })
  .catch((err) => alert(err));
});
gallerySection.renderItems();


// Card Handling functions

const cardHandlers = {

  handleCardClick(card) {
    popupFullview.open(card.name, card.link);
  },

  handleCardDelete(card) {
    popupDeleteCard.open();
    popupDeleteCard.confirmAction(card.deleteCard);
  }
}


// Event Listeners


profileButtonEdit.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['edit-profile'].resetValidation();
  popupEditProfile.open();
});

profileButtonAdd.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupAddCard.open();
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



// Form Validation

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
