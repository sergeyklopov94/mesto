export class Card {
  constructor(data, templateSelector, {handleCardClick}, {handleDeleteClick}) {
    this._data = data;
    this._name = data.name;
    this._image = data.link;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
      this._handleDeleteClick(this._element);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  // приватный метод класса добавления/удаления 'лайка'
  _handleLikeButtonClick() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  // приватный метод класса удаления карточки
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  // публичный метод класса для создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._listenCardEvents();
    return this._element;
  }
}
