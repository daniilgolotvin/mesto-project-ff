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
export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function closePopupByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_open');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
