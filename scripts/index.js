import {initialCards} from './data.js';

// карточки на странице
const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements-container');

//кнопки на странице
const profileEditButton = document.querySelector('.edit-button');
const cardAddButton = document.querySelector('.add-button');

// элементы попапа
const popupEditProfileSection = document.querySelector('.popup_edit-profile');
const popupAddCardSection = document.querySelector('.popup_add-cards');
const popupOpenCardSection = document.querySelector('.popup_open-cards');
const popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
const popupAddProfileForm = popupAddCardSection.querySelector('.popup__content');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');
const imageInput = document.querySelector('#link');
const appellationInput = document.querySelector('#appellation');
const imageOpen = document.querySelector('.popup__image');
const figcaptureOpen = document.querySelector('.popup__caption');

// текстовые элементы страницы
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//открытие попапов
function openPopup(popupSection) {
  popupSection.classList.add('popup_opened');
}


//функция открытия с предзаполнением полей попапа редактирования профиля
function openProfilePopup() {
  autofillPopupEditProfileInputs();
  openPopup(popupEditProfileSection);
}


//функция открытия карточки в масштабе
function openCardPopup(evt) {
  autofillPopupOpenCardSection(evt);
  openPopup(popupOpenCardSection);
}

//закрытие попапов
function closePopup(popupSection) {
  popupSection.classList.remove('popup_opened');
}

//автозаполнение инпутов в попапе редактирования профиля
function autofillPopupEditProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

//автозаполнение попапа открытия карточки
function autofillPopupOpenCardSection(evt) {
  imageOpen.src = evt.target.src;
  imageOpen.alt = evt.target.alt;
  figcaptureOpen.textContent = evt.target.alt;
}

// сохранение изменений в попапе редактирования профиля
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfileSection);
}

//функция создания карточки
function createCard(element) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__name').textContent = element.name;
  cardElement.querySelector('.element__image').alt = element.name;
  listenCardEvents(cardElement);
  return cardElement;
}

// сохранение изменений в попапе добавления карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  const initialCard = {
    name: imageInput.value,
    link: appellationInput.value
  };
  elementsContainer.prepend(createCard(initialCard));
  closePopup(popupAddCardSection);
  popupAddProfileForm.reset();
}

// функция со слушателями событий для карточек
function listenCardEvents(cardElement) {
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    openCardPopup(evt);
  });
}

// слушатели событий
profileEditButton.addEventListener('click', openProfilePopup);
cardAddButton.addEventListener('click', () => openPopup(popupAddCardSection));
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddProfileForm.addEventListener('submit', addCardFormSubmitHandler);
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//предзаполнение карточек из массива
initialCards.forEach(element => {
  elementsContainer.append(createCard(element));
});
