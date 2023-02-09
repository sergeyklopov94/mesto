export class Card {
  constructor(data, templateSelector, userId, {handleCardClick}, {handleDeleteClick}, {handleLikeClick}) {
    this._data = data;
    this._likes = data.likes;
    this._name = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // приватный метод класса для создания шаблона карточки
  _getTemplate() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  // приватный метод класса со слушателями событий для карточек
  _listenCardEvents() {
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._element);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  // публичный метод проверки наличия лайка юзера на карточке
  checkUserLike() {
    let isLike = false;
    for(const like of this._likes) {
      if(like._id === this._userId) {
        isLike = true;
        break;
      }
    }
    return isLike;
  }

  // публичный метод класса добавления/удаления 'лайка'
  likeCard(newLikesInfo) {
    this._likes = newLikesInfo;
    const likesCount = this._likes.length;
    if(this.checkUserLike())
      this._elementLikeButton.classList.add('element__like-button_active');
    else
      this._elementLikeButton.classList.remove('element__like-button_active');
    this._elementLikeNumber.textContent = likesCount;
  }

  // публичный метод класса удаления карточки
  deleteСard() {
    this._element.remove();
    this._element = null;
  }

  // публичный метод получения Id карточки
  getCardId() {
    return this._cardId;
  }

  // публичный метод класса для создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this.likeCard(this._likes);
    if(this._userId !== this._owner._id)
      this._elementDeleteButton.classList.add('element__delete-button_hidden');
    this._listenCardEvents();
    return this._element;
  }
}
