let popupSection = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__button-edit');

profileEditButton.addEventListener('click', function openProfileEdit () {
  popupSection.classList.add('popup_opened');
});

let profilePopupCloseButton = document.querySelector('.popup__button-close');

profilePopupCloseButton.addEventListener('click', function closeProfileEdit () {
  popupSection.classList.remove('popup_opened');
});

let popupName = document.querySelector('.popup__name');
let profileName = document.querySelector('.profile__name');
let popupStatus = document.querySelector('.popup__status');
let profileStatus = document.querySelector('.profile__status');

popupName.placeholder = profileName.textContent;
popupStatus.placeholder = profileStatus.textContent;

let profilePopupSubmitButton = document.querySelector('.popup__button-save');


profilePopupSubmitButton.addEventListener('click', function saveProfileEdit () {
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  popupSection.classList.remove('popup_opened');
  popupName.placeholder = popupName.value;
  popupStatus.placeholder = popupStatus.value;
  popupName.value = null;
  popupStatus.value = null;
});
