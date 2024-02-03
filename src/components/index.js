import '../pages/index.css';
import { closePopup, openPopup, closePopupByOverlayClick, closePopupByEsc } from './modal.js';
import { createPlace, likeButtonActive, deleteCard } from './card.js';
import { initialCards } from './cards.js';

// Объявление переменных для работы с элементами страницы
const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('#open-popup');
const addButton = document.querySelector('#button-add');
const profileNameElement = document.querySelector('#profile-name');
const userName = document.querySelector('#user-name');
const profileDescriptionElement = document.querySelector('#profile-description');
const editSubmitButton = document.querySelector('#editSubmitButton');
const userPost = document.querySelector('#user-post');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const templateElement = document.querySelector('.elements__template').content;
const templateElements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup-image');
const popupImageTitle = popupImage.querySelector('.popup__container-title');
const popupImageImg = popupImage.querySelector('.popup__container-image');
const addName = document.querySelector('.add-name');
const addLink = document.querySelector('.add-link');
const addPopup = document.querySelector('.add-popup');
export {
  templateElement,
  templateElements,
  popupImage,
  popupImageTitle,
  popupImageImg,
  addName,
  addLink,
  addPopup
};

// Функция для добавления карточки на страницу
export function addCard(item, deleteCard, likeButtonActive, handleImageClick) {
  const element = createPlace(item, deleteCard, likeButtonActive, handleImageClick);
  templateElements.prepend(element);
}

//функция для открытия большого изображения карточки
export function handleImageClick(evt) {
  openPopup(popupImage);
  popupImageImg.src = evt.target.getAttribute('src');
  popupImageImg.alt = evt.target.getAttribute('alt');
  popupImageTitle.textContent = popupImageImg.alt;
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

// Функция для создания карточки из шаблона

initialCards.forEach(card => addCard(card));

// Обработчик события отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value.trim();
  closePopup(profilePopup);
}
// Добавляем обработчики событий для кнопок закрытия внутри попапов
document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

// Обработчик события клика на кнопку 'Редактировать профиль'
editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent.trim();
});

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

// Добавляем обработчик для закрытия попапа при клике на overlay
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closePopupByOverlayClick);
});

// Добавляем обработчик для закрытия попапа при нажатии на Esc
document.addEventListener('keydown', closePopupByEsc);

// Обработчик события клика на кнопку 'Добавить' (открывает попап для добавления карточки)
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

// Добавляем обработчик события отправки формы редактирования профиля
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

// Добавляем обработчик события отправки формы добавления карточки
addPopup.addEventListener('submit', handleAddFormSubmit);
