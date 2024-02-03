import { openPopup, closePopup } from './modal';

import { templateElement, templateElements, handleImageClick } from './index.js';

export function createPlace(element, handleImageClick) {
  //функция создания карточкиъ
  const templateElementCopy = templateElement.cloneNode(true);
  const templateImage = templateElementCopy.querySelector('.element__card-image');
  const templateTitle = templateElementCopy.querySelector('.element__group-title');
  const likeButton = templateElementCopy.querySelector('.element__group-button');
  const trashButton = templateElementCopy.querySelector('.element__card-trashbutton');
  templateImage.setAttribute('src', element.link);
  templateImage.setAttribute('alt', element.name);
  templateTitle.textContent = element.name;

  // Добавляем обработчики событий для кнопок 'Лайк' и 'Удалить'
  likeButton.addEventListener('click', likeButtonActive);
  trashButton.addEventListener('click', deleteCard);

  // Добавляем обработчик события клика на изображение карточки
  templateImage.addEventListener('click', handleImageClick);
  return templateElementCopy;
}

// Функция для активации/деактивации кнопки 'Лайк' на карточке
export function likeButtonActive(evt) {
  evt.target.classList.toggle('element__group-button-active');
}

// Функция для удаления карточки
export function deleteCard(evt) {
  const cardElement = evt.currentTarget.closest('.element');
  if (cardElement) {
    cardElement.remove();
  }
}
