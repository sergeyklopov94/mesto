// импорт модулей
import {openCardPopup} from './index.js';

// класс - карточка
export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._image = data.link;
    this._template = template;
  }

  // приватный метод класса для создания шаблона карточки
  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  // приватный метод класса со слушателями событий для карточек
  _listenCardEvents() {
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  // приватный метод класса добавления/удаления 'лайка'
  _handleLikeButtonClick() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  // приватный метод класса удаления карточки
  _handleDeleteButtonClick() {
    this._element.remove();
  }

  // приватный метод открытия карточки в масштабе
  _handleImageClick() {
    openCardPopup(this._elementImage);
  }

  // публичный метод класса для создания карточки
  createCard() {
    this._element = this._getTemplate();
    console.log(this._element);
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._listenCardEvents();

    return this._element;
  }
}
