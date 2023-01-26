export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  // Приватный метод закрытия попапа клавишей 'Esc'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Приватный метод закрытия попапа по нажатию на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // Публичный метод открытия попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  // Публичный метод закрытия попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  // Публичный метод добавления слушателя для закрытия попапа
  setEventListeners() {
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close-button');
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
