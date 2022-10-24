const saintPetersburg = new URL('../images/place_saint-petersburg.png', import.meta.url);
const newZeland = new URL('../images/place_new-zealand.png', import.meta.url);
const morroBay = new URL('../images/place_morro-bay.png', import.meta.url);
const capeBreton = new URL('../images/place_cape-breton.png', import.meta.url);
const sanDiego = new URL('../images/place_san-diego.png', import.meta.url);
const bayOfFires = new URL('../images/place_bay-of-fires.png', import.meta.url);

export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
export const profileButtonAdd = document.querySelector('.profile__button-add');
export const profileButtonEdit = document.querySelector('.profile__button-edit');

export const popupFormAdd = document.querySelector('.popup__form_type_add');
export const popupFormEdit = document.querySelector('.popup__form_type_edit');
export const popupFormEditInputName = document.querySelector('.popup__input_type_name');
export const popupFormEditInputStatus = document.querySelector('.popup__input_type_status');

export const initialCards = [
  {
    place: 'Санкт-Петербург',
    link: saintPetersburg,
  },
  {
    place: 'Новая Зеландия',
    link: newZeland,
  },
  {
    place: 'Морро Бэй',
    link: morroBay,
  },
  {
    place: 'Кейп-Бретон',
    link: capeBreton,
  },
  {
    place: 'Сан-Диего',
    link: sanDiego,
  },
  {
    place: 'Залив Файерс',
    link: bayOfFires,
  },
];

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'button_type_submit-disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};
