export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  // приватный метод закрытия попапа клавишей 'Esc'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // приватный метод закрытия попапа по нажатию на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // публичный метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичный метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // публичный метод изменения текста кнопки сабмита в момент загрузки
  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  // публичный метод добавления слушателя для закрытия попапа
  setEventListeners() {
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
