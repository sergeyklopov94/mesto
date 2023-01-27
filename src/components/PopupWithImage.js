import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  // переопределенный публичный метод открытия попапа с картинкой в масштабе
  open(cardImage) {
    this._popupImage.src = cardImage.link;
    this._popupImage.alt = cardImage.name;
    this._popupCaption.textContent = cardImage.name;
    super.open();
  }
}
