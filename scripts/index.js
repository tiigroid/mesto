let popup = document.querySelector('.popup');
let popupButtonClose = document.querySelector('.popup__button-close');
let popupForm = document.querySelector('.popup__container');
let popupName = document.querySelector('.popup__name');
let popupStatus = document.querySelector('.popup__status');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let profileButtonEdit = document.querySelector('.profile__button-edit');

function popupToggle () {
  popup.classList.toggle('popup_opened');
  popupName.value = '';
  popupStatus.value = '';
  popupName.placeholder = profileName.textContent;
  popupStatus.placeholder = profileStatus.textContent;
  popupName.classList.remove('red-placeholder');
  popupStatus.classList.remove('red-placeholder');
};
function submitPopupForm (evt) {
  evt.preventDefault();
  if (popupName.value.length === 0 || popupStatus.value.length === 0) {
    popupName.placeholder = 'Необходимо заполнить оба поля :)';
    popupStatus.placeholder = 'Необходимо заполнить оба поля :)';
    popupName.classList.add('red-placeholder');
    popupStatus.classList.add('red-placeholder');
    } else {
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popupToggle();
    };
};

profileButtonEdit.addEventListener('click', popupToggle);
popupButtonClose.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', submitPopupForm);