import { deleteCardData, handleRemoveLike, handleSetLike } from '../components/api.js'

const cardTemplate = document.querySelector('#elements').content;

function cloneCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

export function createCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const cardElement = cloneCardTemplate();
  const cardDeletButton = cardElement.querySelector('.card__button');
  const cardLikeCountElement = cardElement.querySelector('.card__likes-number');
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardImage = cardElement.querySelector('.card__photo');
  const isLikedByCurrentUser = cardData.likes.some((like) => like._id === userId);

  cardElement.querySelector('.card__text').textContent = cardData.name;
  cardLikeCountElement.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (likeHandler) {
    cardLikeButton.addEventListener('click', function () {
      likeHandler(cardData._id, cardLikeCountElement, cardLikeButton);
    });
  }

  if (imageHandler) {
    cardImage.addEventListener('click', function () {
      imageHandler(cardData);
    });
  }

  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add('card__like_active');
  }

  if (cardData.owner._id !== userId) {
    cardDeletButton.remove();
  } else {
    cardDeletButton.addEventListener('click', () => {
      deleteHandler(cardData._id, cardElement);
    });
  }

  return cardElement;
}

export function changeLike(cardId, cardLikeCountElement, cardLikeButton) {
  const isLiked = cardLikeButton.classList.contains('card__like_active');
  const likeMethod = isLiked ? handleRemoveLike : handleSetLike;

  likeMethod(cardId)
    .then((updatedCard) => {
      cardLikeCountElement.textContent = updatedCard.likes.length;
      cardLikeButton.classList.toggle('card__like_active');
    })
    .catch(err => console.log(err));
}

export function handleDeleteCard(cardId, cardElement) {
  deleteCardData(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}
