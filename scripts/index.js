const page = document.querySelector(".page");
const popupTemplate = document.querySelector("#popup").content;
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileButtonEdit = document.querySelector(".profile__button-edit");
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
