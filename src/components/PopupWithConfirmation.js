import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__content');
  }

  // публичный метод установки функции по сабмиту
  handleFormSubmit(func) {
    this._handleFormSubmit = func;
  }

  // публичный метод добавления обработчиков сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }

  // переопределенный публичный метод открытия попапа с подтверждением удаления карточки
  open(card) {
    this._card = card;
    super.open();
  }
}
