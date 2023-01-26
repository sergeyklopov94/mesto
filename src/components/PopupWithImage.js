import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
  }

  // переопределенный публичный метод открытия попапа с картинкой в масштабе
  open(cardImage) {
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
    this._popupImage.src = cardImage.src;
    this._popupImage.alt = cardImage.alt;
    this._popupCaption.textContent = cardImage.alt;
    super.open();
  }
}
