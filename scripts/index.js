const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

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
  galleryCard.querySelector('.gallery__title').textContent = place;
  galleryCard.querySelector('.gallery__image').alt = place;
  galleryCard.querySelector('.gallery__image').src = link;
  const buttonDelete = galleryCard.querySelector('.gallery__button-delete');
  const buttonLike = galleryCard.querySelector('.gallery__button-like');
  const galleryImage = galleryCard.querySelector('.gallery__image');
  buttonDelete.addEventListener('click', deleteCard);
  buttonLike.addEventListener('click', toggleLike);
  galleryImage.addEventListener('click', openPopupFullview);
  return galleryCard;
}

function addCard(cardToAdd) {
  gallery.prepend(cardToAdd);
}

function openPopupFullview(evt) {
  popupFullviewImage.src = evt.target.src;
  popupFullviewCaption.textContent = evt.target.alt;
  openPopup(popupFullview);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function toggleLike(evt) {
  evt.target.classList.toggle('button_type_liked');
}

function deleteCard(evt) {
  evt.target.closest('.gallery__card').remove();
}

function fillPopupFormEdit() {
  popupFormEditInputName.value = profileName.textContent;
  popupFormEditInputStatus.value = profileStatus.textContent;
}

function fillPopupFormAdd() {
  popupFormAddInputPlace.value = '';
  popupFormAddInputLink.value = '';
}

profileButtonEdit.addEventListener('click', () => {
  fillPopupFormEdit();
  openPopup(popupEdit);
});

profileButtonAdd.addEventListener('click', () => {
  fillPopupFormAdd();
  openPopup(popupAdd);
});

popupFormEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFormEditInputName.value;
  profileStatus.textContent = popupFormEditInputStatus.value;
  closePopup(popupEdit);
});

popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(makeCard(popupFormAddInputPlace.value, popupFormAddInputLink.value));
  closePopup(popupAdd);
});

buttonsClose.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.parentElement.parentElement);
  });
});
