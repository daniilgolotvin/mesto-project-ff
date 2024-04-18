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
  const closeButtons = popup.querySelectorAll(".popup__close");
  closeButtons.forEach((button) => {
    button.removeEventListener("click", closePopup);
  });
  popup.removeEventListener('mousedown', closePopupClickOverlay);
}

function addCloseListeners(popup) {
  const closeButtons = popup.querySelectorAll(".popup__close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closePopup(popup));
  });
  popup.addEventListener('mousedown', closePopupClickOverlay);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeCloseListeners(popup);
  openedPopup = null;
}

export function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
