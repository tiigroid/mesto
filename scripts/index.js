const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupName = document.querySelector('.popup__text-input_type_name');
const popupStatus = document.querySelector('.popup__text-input_type_status');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileButtonEdit = document.querySelector('.profile__button-edit');

function popupOpen () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
};
function popupClose () {
  popup.classList.remove('popup_opened');
};
function submitPopupForm (evt) {
  evt.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    popupClose();
};

profileButtonEdit.addEventListener('click', popupOpen);
popupButtonClose.addEventListener('click', popupClose);
popupForm.addEventListener('submit', submitPopupForm);
