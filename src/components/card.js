import { openPopup, closePopup } from "./modal";

const templateElement = document.querySelector(".elements__template").content;
const templateElements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup-image");
const popupImageTitle = popupImage.querySelector(".popup__container-title");
const popupImageImg = popupImage.querySelector(".popup__container-image");
const addName = document.querySelector(".add-name");
const addLink = document.querySelector(".add-link");
const addPopup = document.querySelector(".add-popup");
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createPlace(element) {
  //функция создания карточкиъ
  const templateElementCopy = templateElement.cloneNode(true);
  const templateImage = templateElementCopy.querySelector(
    ".element__card-image"
  );
  const templateTitle = templateElementCopy.querySelector(
    ".element__group-title"
  );
  const likeButton = templateElementCopy.querySelector(
    ".element__group-button"
  );
  const trashButton = templateElementCopy.querySelector(
    ".element__card-trashbutton"
  );
  templateImage.setAttribute("src", element.link);
  templateImage.setAttribute("alt", element.name);
  templateTitle.textContent = element.name;

  // Добавляем обработчики событий для кнопок 'Лайк' и 'Удалить'
  likeButton.addEventListener("click", likeButtonActive);
  trashButton.addEventListener("click", deleteCard);

  // Добавляем обработчик события клика на изображение карточки
  templateImage.addEventListener("click", (evt) => {
    openPopup(popupImage);
    popupImageImg.src = evt.target.getAttribute("src");
    popupImageImg.alt = evt.target.getAttribute("alt");
    popupImageTitle.textContent = popupImageImg.alt;
  });

  return templateElementCopy;
}

// Функция для активации/деактивации кнопки 'Лайк' на карточке
export function likeButtonActive(evt) {
  evt.target.classList.toggle("element__group-button-active");
}

// Функция для удаления карточки
export function deleteCard(evt) {
  const cardElement = evt.target.closest(".element");
  if (cardElement) {
    cardElement.remove();
  }
}

// Функция для создания новой карточки и добавления её на страницу
export function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addName.value.trim(),
    link: addLink.value,
  };
  addCard(newCard);
  closePopup(addPopup);
  evt.target.reset();
}

// Функция для добавления карточки на страницу
export function addCard(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
}

// Функция для создания карточки из шаблона

initialCards.forEach(addCard);
