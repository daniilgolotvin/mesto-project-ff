import '../pages/index.css';
import { closePopup, openPopup, closePopupByOverlayClick, closePopupByEsc } from './modal.js';
import { handleAddFormSubmit, handleImageClick, likeButtonActive, deleteCard } from './card.js';
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
export { popupImage, popupImageTitle, popupImageImg, addName, addLink, addPopup };

export function createPlace(element) {
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

// Функция для добавления карточки на страницу
export function addCard(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
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
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopupByOverlayClick(evt, popup);
    }
  });
});
// Добавляем обработчик для закрытия попапа при нажатии на Esc
document.addEventListener('keydown', evt => {
  const openedPopup = document.querySelector('.popup_open');
  if (openedPopup) {
    closePopupByEsc(evt, openedPopup);
  }
});

// Обработчик события клика на кнопку 'Добавить' (открывает попап для добавления карточки)
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

// Добавляем обработчик события отправки формы редактирования профиля
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

// Добавляем обработчик события отправки формы добавления карточки
addPopup.addEventListener('submit', handleAddFormSubmit);
