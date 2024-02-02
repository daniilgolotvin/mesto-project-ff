// Функция для открытия попапа

export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupByEsc);
}

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Функция обработки нажатия клавиши Esc
export const closePopupByEsc = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

export const closePopupByOverlayClick = (evt, popup) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
};
