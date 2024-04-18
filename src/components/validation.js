function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (isInputValid) {
        hideError(inputElement, errorElement, config);
    } else {
        showError(inputElement, errorElement, config);
    }
}

function toggleButtonState(buttonElement, isActive, config) {
    if (buttonElement) {
        if (isActive) {
            buttonElement.disabled = false;
            buttonElement.classList.remove(config.inactiveButtonClass);
        } else {
            buttonElement.classList.add(config.inactiveButtonClass);
            buttonElement.disabled = 'true';
        }
    }
}

export function clearValidation(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    [...inputList].forEach(function(inputElement){
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        hideError(inputElement, errorElement, config);
    });
    toggleButtonState(submitButtonElement, false, config);
}

function setEvenetListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
    [...inputList].forEach(function(inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, formElement, config);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
        });
    });
}

export function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    [...formsList].forEach(function (formElement) {
        setEvenetListener(formElement, config);
    });
}
