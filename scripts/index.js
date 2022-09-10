const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');

const popupsWithForms = document.querySelectorAll('.popup_type_form');
const popupEdit = popupsWithForms[0];
const popupAdd = popupsWithForms[1];

const popupFormEdit = document.querySelector('.popup__form_type_edit');
const popupFormEditInputName = document.querySelector('.popup__input_type_name');
const popupFormEditInputStatus = document.querySelector('.popup__input_type_status');

const popupFormAdd = document.querySelector('.popup__form_type_add');
const popupFormAddInputPlace = document.querySelector('.popup__input_type_place');
const popupFormAddInputLink = document.querySelector('.popup__input_type_link');

const popupFullview = document.querySelector('.popup_type_fullview');
const popupFullviewImage = document.querySelector('.popup__image');
const popupFullviewCaption = document.querySelector('.popup__caption');

const gallery = document.querySelector('.gallery');
const galleryCardTemplate = document.querySelector('#gallery__card').content;

const buttonsClose = document.querySelectorAll('.button_type_close');

initialCards.forEach((card) => {
  addCard(makeCard(card.place, card.link));
});

function makeCard(place, link) {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  const galleryImage = galleryCard.querySelector('.gallery__image');
  const galleryTitle = galleryCard.querySelector('.gallery__title');
  galleryTitle.textContent = place;
  galleryImage.alt = place;
  galleryImage.src = link;
  return galleryCard;
}

function addCard(cardToAdd) {
  gallery.prepend(cardToAdd);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupFullview(evt) {
  if (evt.target.classList.contains('gallery__image')) {
  fillPopupFullview(evt);
  openPopup(popupFullview);
  }
}

function toggleLike(evt) {
  if (evt.target.classList.contains('button_type_like')) {
  evt.target.classList.toggle('button_type_liked');
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('gallery__button-delete')) {
  evt.target.closest('.gallery__card').remove();
  }
}

function fillPopupFullview(evt) {
  popupFullviewImage.src = evt.target.src;
  popupFullviewCaption.textContent = evt.target.alt;
}

function fillPopupFormEdit() {
  popupFormEditInputName.value = profileName.textContent;
  popupFormEditInputStatus.value = profileStatus.textContent;
}

function changeProfile() {
  profileName.textContent = popupFormEditInputName.value;
  profileStatus.textContent = popupFormEditInputStatus.value;
}

gallery.addEventListener('click', deleteCard);
gallery.addEventListener('click', toggleLike);
gallery.addEventListener('click', openPopupFullview);

profileButtonEdit.addEventListener('click', () => {
  fillPopupFormEdit();
  openPopup(popupEdit);
});

profileButtonAdd.addEventListener('click', () => {
  popupFormAdd.reset();
  openPopup(popupAdd);
});

popupFormEdit.addEventListener('submit', () => {
  changeProfile();
  closePopup(popupEdit);
});

popupFormAdd.addEventListener('submit', () => {
  addCard(makeCard(popupFormAddInputPlace.value, popupFormAddInputLink.value));
  closePopup(popupAdd);
});

buttonsClose.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.parentElement.parentElement);
  });
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
});
