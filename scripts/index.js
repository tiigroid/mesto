const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');

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

initialCards.forEach((card) => {
  addCard(makeCard(card.place, card.link));
});

function makeCard(place, link) {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  const galleryImage = galleryCard.querySelector('.gallery__image');
  const galleryTitle = galleryCard.querySelector('.gallery__title');
  const galleryButtonDelete = galleryCard.querySelector('.gallery__button-delete');
  const galleryButtonLike = galleryCard.querySelector('.gallery__button-like');
  galleryTitle.textContent = place;
  galleryImage.alt = place;
  galleryImage.src = link;
  galleryImage.addEventListener('click', openPopupFullview);
  galleryButtonDelete.addEventListener('click', deleteCard);
  galleryButtonLike.addEventListener('click', toggleLike);
  return galleryCard;
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

function openPopupFullview(evt) {
  fillPopupFullview(evt);
  openPopup(popupFullview);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function toggleLike(evt) {
  evt.target.classList.toggle('button_type_liked');
}

function deleteCard(evt) {
  evt.target.closest('.gallery__card').remove();
}

function fillPopupFullview(evt) {
  popupFullviewImage.src = evt.target.src;
  popupFullviewImage.alt = evt.target.alt;
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
  addCard(makeCard(popupFormAddInputPlace.value, popupFormAddInputLink.value));
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
