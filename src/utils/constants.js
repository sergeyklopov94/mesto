// массив объектов карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объект с настройками для валидации
export const formValidators = {
  formSelector: '.popup__content',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__error_visible'
};

// селекторы карточек на странице
export const cardTemplateSelector = '#card-template';
export const elementsContainerSelector = '.elements-container';

// кнопки на странице
export const profileEditButton = document.querySelector('.edit-button');
export const cardAddButton = document.querySelector('.add-button');
export const profileAvatarEditButton = document.querySelector('.profile__avatar');

// элементы попапа
export const popupEditProfileSection = document.querySelector('.popup_edit-profile');
export const popupEditAvatarSection = document.querySelector('.popup_edit-avatar');
export const popupAddCardSection = document.querySelector('.popup_add-cards');
export const popupOpenCardSection = document.querySelector('.popup_open-cards');
export const popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
export const popupEditAvatarForm = popupEditAvatarSection.querySelector('.popup__content');
export const popupAddCardForm = popupAddCardSection.querySelector('.popup__content');

// селекторы попапа
export const popupEditProfileSelector = '.popup_edit-profile';
export const popupEditAvatarSelector = '.popup_edit-avatar'
export const popupAddCardSelector = '.popup_add-cards';
export const popupOpenCardSelector = '.popup_open-cards';
export const popupDeleteCardSelector = '.popup_delete-cards';

// текстовые элементы страницы
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

// селекторы элементов страницы
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';
