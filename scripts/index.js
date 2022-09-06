const initialCards = [
  {
    place: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1488278905738-514111aa236c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    place: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1504064860048-974c8788c612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    place: 'Морро Бэй',
    link: 'https://images.unsplash.com/photo-1597839271116-399cd739ddb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    place: 'Кейп-Бретон',
    link: 'https://images.unsplash.com/photo-1540913570178-23a49e4e8616?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    place: 'Сан-Диего',
    link: 'https://images.unsplash.com/photo-1609994819063-e8de7339880b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    place: 'Залив Файерс',
    link: 'https://images.unsplash.com/photo-1597762453091-4467f4b15761?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  }
];

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

const popupFormEdit = document.querySelector('.popup__form_type_edit');
const popupFormEditInputName = document.querySelector('.popup__input_type_name');
const popupFormEditInputStatus = document.querySelector('.popup__input_type_status');

const popupFormAdd = document.querySelector('.popup__form_type_add');
const popupFormAddInputPlace = document.querySelector('.popup__input_type_place');
const popupFormAddInputLink = document.querySelector('.popup__input_type_link');

const popupFullview = document.querySelector('.popup__type_fullview');
const popupFullviewImage = document.querySelector('.popup__image');
const popupFullviewCaption = document.querySelector('.popup__caption');

const gallery = document.querySelector('.gallery');
const galleryCardTemplate = document.querySelector('#gallery__card').content;

const buttonsClose = Array.from(document.querySelectorAll('.button_type_close'));

let galleryImages = Array.from(document.querySelectorAll('.gallery__image'));
let buttonsLike = Array.from(document.querySelectorAll('.button_type_like'));
let buttonsDelete = Array.from(document.querySelectorAll('.button_type_delete'));

profileButtonEdit.addEventListener('click', openPopupProfileEdit);
profileButtonAdd.addEventListener('click', openPopupProfileAdd);
popupFormEdit.addEventListener('submit', submitFormProfileEdit);
popupFormAdd.addEventListener('submit', submitFormProfileAdd);

buttonsClose.forEach( (button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target)
  });
});

initialCards.forEach((initialCard) => {
  makeCard(initialCard.place, initialCard.link);
});

function renderImageListeners() {
  galleryImages = Array.from(document.querySelectorAll('.gallery__image'));
  galleryImages.forEach( (image) => {
    image.addEventListener('click', openPopupFullview)
  });
}

function renderLikeListeners() {
  buttonsLike = Array.from(document.querySelectorAll('.button_type_like'));
  buttonsLike.forEach( (button) => {
    button.addEventListener('click', toggleLike)
  });
}

function renderDeleteListeners() {
  buttonsDelete = Array.from(document.querySelectorAll('.button_type_delete'));
  buttonsDelete.forEach( (button) => {
    button.addEventListener('click', deleteCard)
  });
}

function makeCard(place, link) {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  galleryCard.querySelector('.gallery__title').textContent = place;
  galleryCard.querySelector('.gallery__image').alt = place;
  galleryCard.querySelector('.gallery__image').src = link;
  gallery.prepend(galleryCard);
  renderImageListeners();
  renderLikeListeners();
  renderDeleteListeners();
}

function openPopupProfileEdit() {
  popupFormEditInputName.value = profileName.textContent;
  popupFormEditInputStatus.value = profileStatus.textContent;
  popupFormEdit.parentElement.classList.add('popup_opened');
}

function openPopupProfileAdd() {
  popupFormAddInputPlace.value = '';
  popupFormAddInputLink.value = '';
  popupFormAdd.parentElement.classList.add('popup_opened');
}

function submitFormProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = popupFormEditInputName.value;
  profileStatus.textContent = popupFormEditInputStatus.value;
  closePopup(popupFormEdit);
}

function submitFormProfileAdd(evt) {
  evt.preventDefault();
  makeCard(popupFormAddInputPlace.value, popupFormAddInputLink.value);
  closePopup(popupFormAdd);
}

function openPopupFullview(evt) {
  popupFullviewImage.src = evt.target.src;
  popupFullviewCaption.textContent = evt.target.alt;
  openPopup(popupFullview);
}

function openPopup(node) {
  node.closest('.popup').classList.add('popup_opened');
}

function closePopup(node) {
  node.closest('.popup').classList.remove('popup_opened');
}

function toggleLike(evt) {
  evt.target.classList.toggle('button_type_liked');
}

function deleteCard(evt) {
  evt.target.closest('.gallery__card').remove();
}
