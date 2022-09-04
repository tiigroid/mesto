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

const galleryCardTemplate = document.querySelector('#gallery__card').content;
const gallery = document.querySelector('.gallery');

initialCards.forEach(function (item) {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  galleryCard.querySelector('.gallery__image').src = item.link;
  galleryCard.querySelector('.gallery__image').alt = galleryCard.querySelector('.gallery__title').textContent = item.name;
  gallery.prepend(galleryCard);
});







const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupName = document.querySelector('.popup__text-input_type_name');
const popupStatus = document.querySelector('.popup__text-input_type_status');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const page = document.querySelector(".page");
const popupTemplate = document.querySelector("#popup").content;
const profileButtonAdd = document.querySelector(".profile__button-add");

profileButtonEdit.addEventListener("click", createPopupEdit);
profileButtonAdd.addEventListener("click", createPopupAdd);

function createPopupEdit() {
  const popup = popupTemplate.querySelector(".popup").cloneNode(true);
  popup.querySelector(".popup__title").textContent = "Редактировать профиль";
  popup.querySelector(".popup__button-save").textContent = "Сохранить";
  const popupInputs = popup.querySelectorAll(".popup__input");
  popupInputs[0].classList.add("popup__input_type_name");
  popupInputs[1].classList.add("popup__input_type_status");
  const popupName = popup.querySelector(".popup__input_type_name");
  const popupStatus = popup.querySelector(".popup__input_type_status");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  page.append(popup);
  popup.classList.add("popup_opened");
  const popupForm = popup.querySelector(".popup__container");
  popupForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popup.remove();
  });
  const popupButtonClose = popup.querySelector(".popup__button-close");
  popupButtonClose.addEventListener("click", () => {
    popup.remove();
  });
}

function createPopupAdd() {
  const popup = popupTemplate.querySelector(".popup").cloneNode(true);
  popup.querySelector(".popup__title").textContent = "Новое место";
  popup.querySelector(".popup__button-save").textContent = "Создать";
  const popupInputs = popup.querySelectorAll(".popup__input");
  popupInputs[0].classList.add("popup__input_type_place");
  popupInputs[1].classList.add("popup__input_type_link");
  const popupPlace = popup.querySelector(".popup__input_type_place");
  const popupLink = popup.querySelector(".popup__input_type_link");
  popupPlace.placeholder = "Название";
  popupLink.placeholder = "Ссылка на картинку";
  page.append(popup);
  popup.classList.add("popup_opened");
  const popupForm = popup.querySelector(".popup__container");
  popupForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createCard();
    popup.remove();
  });
  const popupButtonClose = popup.querySelector(".popup__button-close");
  popupButtonClose.addEventListener("click", () => {
    popup.remove();
  });
}
