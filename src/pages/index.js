import {
  getInitialCards,
  getUserInfo,
  saveNewCardData,
  saveUserData,
  saveUserPicture
} from '../components/api.js'
import { changeLike, createCard, handleDeleteCard } from '../components/card.js'
import { closePopup, closePopupClickOverlay, openPopup } from '../components/modal.js'
import { clearValidation, enableValidation } from '../components/validation.js'
import '../pages/index.css'

const config = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__form",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_type_invalid",
  inputErrorClass: "popup__form_type_invalid",
};

const cardsContainer = document.querySelector('.cards');

const profileImage = document.querySelector('.profile__avatar');
const profilePopup = document.querySelector("#profile");
const buttonOpenProfilePopup = document.querySelector(".profile__pencil");
const popupProfileCloseButton = profilePopup.querySelectorAll(".popup__close");
const profileForm = profilePopup.querySelector(".popup__forms");
const nameInput = profileForm.querySelector(".popup__form_type_name");
const jobInput = profileForm.querySelector(".popup__form_type_job");
const profileFormSubmitButton = profilePopup.querySelector(".popup__save");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const cardPopup = document.querySelector("#cards");
const buttonOpenAddCardPopup = document.querySelector(".profile__plus");
const popupCardCloseButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__forms");
const popupCardInputName = cardForm.querySelector(".popup__form_type_title");
const popupCardInputLink = cardForm.querySelector(".popup__form_type_link");
const popupImage = document.querySelector('.popup_overlay');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__image-name');
const popupPictureCloseButton = popupImage.querySelector('.popup__close');
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar');
const popupUpdatePicture = document.querySelector('#pic');
const popupFormUpdatePicture = document.querySelector('form[name="update-pic"]');
const popupInputPictureUrl = popupFormUpdatePicture.querySelector('.popup__form_type_picture-url');

let userId;

function changeLikeHandler(cardId, cardLikeCountElement, cardLikeButton) {
  changeLike(cardId, cardLikeCountElement, cardLikeButton);
}

function addCard(cardElement) {
  cardsContainer.append(cardElement);
}

function addNewCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
  cardsContainer.prepend(card);
}

function renderUserInfo(userData) {
  profileName.textContent = userData.name;
  profileText.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function renderCards(initialCardsData) {
  initialCardsData.forEach(cardData => {
    const cardElement = createCard(cardData, handleDeleteCard, changeLikeHandler, openImagePopup, userId);
    addCard(cardElement);
  });
}

function openUpdatePicturePopup() {
  clearValidation(popupFormUpdatePicture, config);
  openPopup(popupUpdatePicture);
}

function openEditPopup() {
  clearValidation(profileForm, config);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
}

function openNewCardPopup() {
  clearValidation(cardForm, config);
  openPopup(cardPopup);
}

function openImagePopup(cardData) {
  popupImagePhoto.src = cardData.link;
  popupImagePhoto.alt = cardData.name;
  popupImageText.textContent = cardData.name;
  openPopup(popupImage);
}

function handleFormSubmitUpdatePicture(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...';

  const pictureData = {
    avatar: popupInputPictureUrl.value
  }

  saveUserPicture(pictureData)
    .then((updatedUserData) => {
      profileImage.style.backgroundImage = `url(${updatedUserData.avatar})`;
      closePopup(popupUpdatePicture);
      popupFormUpdatePicture.reset();
      clearValidation(popupFormUpdatePicture, config);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}


function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...';

  const newName = nameInput.value;
  const newJob = jobInput.value;

  saveUserData(newName, newJob)
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileText.textContent = updatedUserData.about;
      closePopup(profilePopup);
      clearValidation(profileForm, config);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  profileFormSubmitButton.textContent = 'Сохранение...';

  const cardDataNew = {
    name: popupCardInputName.value,
    link: popupCardInputLink.value
  };

  saveNewCardData(cardDataNew)
    .then((newCardData) => {
      addNewCard(newCardData, handleDeleteCard, changeLike, openImagePopup, userId);
      closePopup(cardPopup);
      cardForm.reset();
      clearValidation(cardForm, config);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      profileFormSubmitButton.textContent = 'Сохранить';
    });
}

popupProfileCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('click', closePopupClickOverlay);
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', handleFormSubmitEdit);
cardForm.addEventListener('submit', handleFormSubmitNewCard);
popupFormUpdatePicture.addEventListener('submit', handleFormSubmitUpdatePicture);
buttonOpenProfilePopup.addEventListener('click', openEditPopup);
buttonOpenAddCardPopup.addEventListener('click', openNewCardPopup);
profileEditAvatarButton.addEventListener('click', openUpdatePicturePopup);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCardsData, userData]) => {
    renderUserInfo(userData);
    userId = userData._id;
    renderCards(initialCardsData);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });

enableValidation(config);
