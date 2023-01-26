import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupForm = this._popupSelector.querySelector('.popup__content');
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__info'));
  }

  // приватный метод для сбора данных всех полей формы
  _getInputValues() {
    const inputsData = {};
    this._inputs.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  // Публичный метод для заполнения всех полей формы данными
  setInputValues(inputData) {
    this._inputs.forEach((input) => {
      input.value = inputData[input.name];
    });
  }

  // Публичный метод добавления обработчиков сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Публичный метод закрытия и сброса формы
  close() {
    super.close();
    this._popupForm.reset();
  }
}
