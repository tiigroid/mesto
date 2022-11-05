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
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithDialoge from '../scripts/components/PopupWithDialoge.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '7f2b5ce8-c0a9-4e95-aae4-8d0e46f875cc',
    'Content-Type': 'application/json'
  }
});

let thisUser;

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  thisUser = userData;
  userInfo.setUserInfo(thisUser);
  userInfo.setUserAvatar(thisUser);
  gallerySection.renderItems(initialCards.reverse());
})
.catch(err => alert(err));


// User Information

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);


// New Popups

const popupEditProfile = new PopupWithForm('.edit-profile-popup', (inputValues) => {
  popupEditProfile.renderLoading(true);
  api.patchUserData(inputValues)
  .then(userData => {
    thisUser = userData;
    userInfo.setUserInfo(thisUser);
    popupEditProfile.close();
  })
  .catch(err => alert(err))
  .finally(() => popupEditProfile.renderLoading(false));
});
popupEditProfile.setEventListeners();


const popupAddCard = new PopupWithForm('.add-card-popup', (inputValues) => {
  popupAddCard.renderLoading(true);
  api.postCard(inputValues)
  .then(cardData => {
    gallerySection.renderItem(cardData);
    popupAddCard.close();
  })
  .catch(err => alert(err))
  .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();


const popupAvatar = new PopupWithForm('.change-avatar-popup', (inputValues) => {
  popupAvatar.renderLoading(true);
  api.patchUserAvatar(inputValues)
  .then(userData => {
    userInfo.setUserAvatar(userData);
    popupAvatar.close();
  })
  .catch(err => alert(err))
  .finally(() => popupAvatar.renderLoading(false))
});
popupAvatar.setEventListeners();


const popupDeleteCard = new PopupWithDialoge('.delete-card-popup', 'Удаление...');
popupDeleteCard.setEventListeners();


const popupFullview = new PopupWithImage('.popup_type_fullview');
popupFullview.setEventListeners();


// New Sections

const gallerySection = new Section('.gallery', (card) => {
  const newCard = new Card('#gallery__card', card, cardHandlers, thisUser).generateCard();
  gallerySection.addItem(newCard);
});


// Card handling functions

const cardHandlers = {

  handleCardClick(card) {
    popupFullview.open(card.name, card.link);
  },

  putCardLike(card) {
    api.putCardLike(card._id)
    .then(res => card.renderLike(res))
    .catch(err => alert(err));
  },

  deleteCardLike(card) {
    api.deleteCardLike(card._id)
    .then(res => card.renderLike(res))
    .catch(err => alert(err));
  },

  handleCardDelete(card) {
    popupDeleteCard.open();
    popupDeleteCard.setNewHandler(() => {
      popupDeleteCard.renderLoading(true);
      api.deleteCard(card._id)
      .then(() => card.deleteCard())
      .then(() => popupDeleteCard.close())
      .catch(err => alert(err))
      .finally(() => setTimeout(() => popupDeleteCard.renderLoading(false), 200));
    });
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

profileAvatarOverlay.addEventListener('click', () => {
  formValidators['change-avatar'].resetValidation();
  popupAvatar.open();
});


// Form Validation

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(form => {
    const validator = new FormValidator(settings, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(validationSettings);
