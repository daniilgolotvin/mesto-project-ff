import { openPopup, closePopup } from './modal';

import {
  popupImage,
  popupImageTitle,
  popupImageImg,
  addName,
  addLink,
  addPopup,
  addCard
} from './index.js';

export function handleImageClick(evt) {
  openPopup(popupImage);
  popupImageImg.src = evt.target.getAttribute('src');
  popupImageImg.alt = evt.target.getAttribute('alt');
  popupImageTitle.textContent = popupImageImg.alt;
}

// Функция для активации/деактивации кнопки 'Лайк' на карточке
export function likeButtonActive(evt) {
  evt.target.classList.toggle('element__group-button-active');
}

// Функция для удаления карточки
export function deleteCard(evt) {
  const cardElement = evt.target.closest('.element');
  if (cardElement) {
    cardElement.remove();
  }
}

// Функция для создания новой карточки и добавления её на страницу
export function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addName.value.trim(),
    link: addLink.value
  };
  addCard(newCard);
  closePopup(addPopup);
  evt.target.reset();
}
