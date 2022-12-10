// объект с настройками для валидации
export const formValidators = {
  formSelector: '.popup__content',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__error_visible'
};

// функция отображения ошибок при валидации
const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

// функция скрытия ошибок валидации в формах
const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

// функция выбора отображения/скрытия ошибок валидации форм
const checkInputValidity = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

// функция проверки валидности инпутов формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// функция изменения работы кнопки в зависимости от валидности инпутов формы
const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// функция добавления слушателей для инпутов формы
const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

// функция включения валидации всех форм
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement, object);
  });
};

enableValidation(formValidators);

// функция скрытия ошибок валидации при открытии попапа и установки состояния кнопки
// принимает в параметрах секцию попапа и объект с настройками
export function validateOpenedPopup(popupSection, object) {
  const form = popupSection.querySelector(object.formSelector);
  const inputList = Array.from(form.querySelectorAll(object.inputSelector));
  const buttonElement = form.querySelector(object.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, object);
    toggleButtonState(inputList, buttonElement, object);
  });
}
