const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1488278905738-514111aa236c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1504064860048-974c8788c612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Морро Бэй',
    link: 'https://images.unsplash.com/photo-1597839271116-399cd739ddb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Кейп-Бретон',
    link: 'https://images.unsplash.com/photo-1540913570178-23a49e4e8616?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Сан-Диего',
    link: 'https://images.unsplash.com/photo-1609994819063-e8de7339880b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Залив Файерс',
    link: 'https://images.unsplash.com/photo-1597762453091-4467f4b15761?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  }
];
const gallery = document.querySelector('.gallery');
const galleryCardTemplate = document.querySelector('#gallery__card').content;

initialCards.forEach( (item) => {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  galleryCard.querySelector('.gallery__image').src = item.link;
  galleryCard.querySelector('.gallery__image').alt = galleryCard.querySelector('.gallery__title').textContent = item.name;
  gallery.prepend(galleryCard);
});

const page = document.querySelector('.page');
const popupTemplate = document.querySelector('#popup').content;
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');

function createPopupEdit() {
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popup.querySelector('.popup__button-save').textContent = 'Сохранить';
  const popupInputs = popup.querySelectorAll('.popup__input');
  popupInputs[0].value = profileName.textContent;
  popupInputs[1].value = profileStatus.textContent;
  page.append(popup);
    popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = popupInputs[0].value;
    profileStatus.textContent = popupInputs[1].value;
    popup.remove();
  });
  buttonCloseListener();
}

function createPopupAdd() {
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  popup.querySelector('.popup__title').textContent = 'Новое место';
  popup.querySelector('.popup__button-save').textContent = 'Создать';
  const popupInputs = popup.querySelectorAll('.popup__input');
  popupInputs[0].placeholder = 'Название';
  popupInputs[1].placeholder = 'Ссылка на картинку';
  page.append(popup);
  popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
    galleryCard.querySelector('.gallery__image').src = popupInputs[0].value;
    galleryCard.querySelector('.gallery__image').alt = galleryCard.querySelector('.gallery__title').textContent = popupInputs[1].value;
    gallery.prepend(galleryCard);
    popup.remove();
    galleryButtonDeleteListener();
    galleryButtonLikeListener();
  });
  buttonCloseListener();
}

function galleryButtonDeleteListener() {
  const galleryButtonDelete = Array.from(document.querySelectorAll('.gallery__button-delete'));
  galleryButtonDelete.forEach( (item) => item.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__card').remove();
    }));
}

function galleryButtonLikeListener() {
  const galleryButtonLike = Array.from(document.querySelectorAll('.gallery__button-like'));
  galleryButtonLike.forEach( (item) => item.addEventListener('click', (evt) => {
    evt.target.classList.add('button_type_liked');
  }));
}

function buttonCloseListener() {
  const buttonClose = Array.from(document.querySelectorAll('.button_type_close'));
  buttonClose.forEach( (item) => item.addEventListener('click', (evt) => {
    evt.target.parentElement.parentElement.remove();
  }));
}

function galleryImageListener() {
  const galleryImage = Array.from(document.querySelectorAll('.gallery__image'));
  galleryImage.forEach( (item) => item.addEventListener('click', (evt) => {
    const fullviewTemplate = document.querySelector('#fullview').content;
    const fullview = fullviewTemplate.querySelector('.fullview').cloneNode(true);
    page.append(fullview);
    fullview.querySelector('.fullview__image').src = item.src;
    fullview.querySelector('.fullview__caption').textContent = fullview.querySelector('.fullview__image').alt = item.alt;
    buttonCloseListener();
  }));
}

galleryButtonDeleteListener();
galleryButtonLikeListener();
galleryImageListener();
profileButtonEdit.addEventListener('click', createPopupEdit);
profileButtonAdd.addEventListener('click', createPopupAdd);
