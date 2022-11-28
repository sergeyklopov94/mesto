import {initialCards} from './data.js';

// карточки на странице
const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements-container');

//кнопки на странице
const profileEditButton = document.querySelector('.edit-button');
const cardAddButton = document.querySelector('.add-button');
 
// элементы попапа
let popupEditProfileSection = document.querySelector('.popup_edit-profile');
let popupAddCardSection = document.querySelector('.popup_add-cards');
let popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
let popupAddProfileForm = popupAddCardSection.querySelector('.popup__content');
let popupCloseButtonList = document.querySelectorAll('.popup__close-button');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#about');
let imageInput = document.querySelector('#link');
let appellationInput = document.querySelector('#appellation');

// текстовые элементы страницы
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup(popupSection) {
  if (popupSection.classList.contains('popup_edit-profile')) {
    popupSection.classList.add('popup_opened');
    autofillPopupEditProfileInputs();
  }
  else if (popupSection.classList.contains('popup_add-cards')) {
    popupSection.classList.add('popup_opened');
  }
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//автозаполнение инпутов в попапе редактирования профиля
function autofillPopupEditProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}


// сохранение изменений в попапе редактирования профиля
function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(evt);
}

// сохранение изменений в попапе добавления карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = imageInput.value;
  cardElement.querySelector('.element__name').textContent = appellationInput.value;
  elementsContainer.prepend(cardElement);
  closePopup(evt);
  listenCardEvents(cardElement);
}

// функция со слушателями событий для карточек
function listenCardEvents(cardElement) {
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });
} 

// слушатели событий
profileEditButton.addEventListener('click', () => openPopup(popupEditProfileSection));
cardAddButton.addEventListener('click', () => openPopup(popupAddCardSection));
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddProfileForm.addEventListener('submit', addCardFormSubmitHandler);
popupCloseButtonList.forEach(button => {
  button.addEventListener('click', closePopup);
});

//предзаполнение карточек из массива
initialCards.forEach(element => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__name').textContent = element.name;
  elementsContainer.append(cardElement);
  listenCardEvents(cardElement);
});

