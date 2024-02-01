import { disableButton } from "./validation.js";
// Функция для открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscPress);
}

// Функция для закрытия попапа
export function closePopup(popup) {
  disableButton(editSubmitButton, "popup__save-button_inactive");
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscPress);
}

// Функция обработки нажатия клавиши Esc
export function handleEscPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
