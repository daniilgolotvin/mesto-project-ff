let openedPopup = null;

export function openPopup(popup) {
  if (openedPopup) {
    closePopup(openedPopup);
  }

  popup.classList.add("popup_opened");
  addCloseListeners(popup);
  openedPopup = popup;
}

function removeCloseListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton && closeButton.closeListener) {
    closeButton.removeEventListener("click", closeButton.closeListener);
    closeButton.closeListener = undefined;
  }
  popup.removeEventListener('mousedown', closePopupClickOverlay);
}

function addCloseListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    const closeListener = () => closePopup(popup);
    closeButton.addEventListener("click", closeListener);
    closeButton.closeListener = closeListener;
  }
  popup.addEventListener('mousedown', closePopupClickOverlay);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeCloseListeners(popup);
  openedPopup = null;
}

export function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
    closePopup(evt.currentTarget);
  }
}
