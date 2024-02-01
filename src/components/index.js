import "../pages/index.css";
import { closePopup, openPopup, handleEscPress } from "./modal";
import { initialCards } from "./card";
import { handleAddFormSubmit } from "./card.js";

// Объявление переменных для работы с элементами страницы
const profilePopup = document.querySelector(".profile-popup");
const addPopup = document.querySelector(".add-popup");
const editButton = document.querySelector("#open-popup");
const addButton = document.querySelector("#button-add");
const profileNameElement = document.querySelector("#profile-name");
const userName = document.querySelector("#user-name");
const profileDescriptionElement = document.querySelector(
  "#profile-description"
);
const editSubmitButton = document.querySelector("#editSubmitButton");
const userPost = document.querySelector("#user-post");
const profilePopupForm = profilePopup.querySelector(".popup__form");

// Обработчик события отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value.trim();
  closePopup(profilePopup);
}
// Добавляем обработчики событий для кнопок закрытия внутри попапов
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});

// Обработчик события клика на кнопку 'Редактировать профиль'
editButton.addEventListener("click", function () {
  openPopup(profilePopup);
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent.trim();
});

// Добавляем обработчик для закрытия попапа при клике на overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик события клика на кнопку 'Добавить' (открывает попап для добавления карточки)
addButton.addEventListener("click", function () {
  openPopup(addPopup);
});

// Добавляем обработчик события отправки формы редактирования профиля
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

// Добавляем обработчик события отправки формы добавления карточки
addPopup.addEventListener("submit", handleAddFormSubmit);
