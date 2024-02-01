// Функция для отображения ошибки ввода
export const showInputError = (
  formElement,
  inputElement,
  { inputErrorType, inputErrorTypeClass, errorClassActive }
) => {
  const errorElement = formElement.querySelector(
    `${inputErrorType}${inputElement.id}`
  );
  inputElement.classList.add(inputErrorTypeClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClassActive);
};

// Функция для скрытия ошибки ввода
export const hideInputError = (
  formElement,
  inputElement,
  { inputErrorType, inputErrorTypeClass, errorClassActive }
) => {
  const errorElement = formElement.querySelector(
    `${inputErrorType}${inputElement.id}`
  );
  inputElement.classList.remove(inputErrorTypeClass);
  errorElement.classList.remove(errorClassActive);
  errorElement.textContent = "";
};

// Функция для проверки валидности введенных данных в поле ввода
export const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

export const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // При открытии попапа формы редактирования профиля проверяем наличие невалидных полей
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  // Добавляем обработчик события "reset" для формы
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, config.inactiveButtonClass);
  });

  // Добавляем обработчики события "input" для всех полей ввода
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, config);

      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
};

// Функция для включения валидации для всех указанных форм на странице
export const enableValidation = (config) => {
  const forms = document.forms;
  const formList = Array.from(forms);

  formList.forEach((formElement) => {
    // Отменяем стандартное поведение формы при отправке и добавляем обработчики событий
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// Функция для проверки наличия невалидных полей в списке
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция для отключения кнопки
export function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

// Функция для включения кнопки
export function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

// Функция для переключения состояния кнопки в зависимости от валидности полей ввода
export function toggleButtonState(
  inputList,
  buttonElement,
  inactiveButtonClass
) {
  disableButton(buttonElement, inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
}

// Включаем валидацию для форм на странице с помощью конфигурации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__name",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorTypeClass: ".popup__name_type_error",
  errorClassActive: "popup__input-error_active",
  inputErrorType: ".popup__input-error_type_",
  fieldsetList: ".popup__fieldset",
});
