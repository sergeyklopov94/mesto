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
const showInputError = (formElement, inputElement, errorMessage, formValidators) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formValidators.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidators.errorClass);
};

// функция скрытия ошибок валидации в формах
const hideInputError = (formElement, inputElement, formValidators) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formValidators.inputErrorClass);
  errorElement.classList.remove(formValidators.errorClass);
  errorElement.textContent = '';
};

// функция выбора отображения/скрытия ошибок валидации форм
const checkInputValidity = (formElement, inputElement, formValidators) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formValidators);
  } else {
    hideInputError(formElement, inputElement, formValidators);
  }
};

// функция проверки валидности инпутов формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// функция изменения работы кнопки в зависимости от валидности инпутов формы
const toggleButtonState = (inputList, buttonElement, formValidators) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formValidators.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formValidators.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// функция добавления слушателей для инпутов формы
const setEventListeners = (formElement, formValidators) => {
  const inputList = Array.from(formElement.querySelectorAll(formValidators.inputSelector));
  const buttonElement = formElement.querySelector(formValidators.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formValidators);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formValidators);
      toggleButtonState(inputList, buttonElement, formValidators);
    });
  });
};

// функция включения валидации всех форм
const enableValidation = (formValidators) => {
  const formList = Array.from(document.querySelectorAll(formValidators.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement, formValidators);
  });
};

enableValidation(formValidators);

// функция скрытия ошибок валидации при открытии попапа и установки состояния кнопки
// принимает в параметрах секцию попапа и объект с настройками
export function resetFormState(popupSection, formValidators) {
  const form = popupSection.querySelector(formValidators.formSelector);
  const inputList = Array.from(form.querySelectorAll(formValidators.inputSelector));
  const buttonElement = form.querySelector(formValidators.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, formValidators);
    toggleButtonState(inputList, buttonElement, formValidators);
  });
}
