import {initialCards} from './data.js';

// карточки на странице
const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements-container');

//кнопки на странице
const profileEditButton = document.querySelector('.edit-button');
 
// элементы попапа
let popupEditProfileSection = document.querySelector('.popup');
let popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
const popupEditProfileCloseButton = popupEditProfileSection.querySelector('.popup__close-button');
let popupEditProfileInfoInputList = popupEditProfileSection.querySelectorAll('.popup__info');
let nameInput = popupEditProfileInfoInputList[0];
let jobInput = popupEditProfileInfoInputList[1];

// техтовые элементы страницы
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopupEditProfile() {
  popupEditProfileSection.classList.add('popup_opened');
  autofillPopupEditProfileInputs();
}

function closePopupEditProfile() {
  popupEditProfileSection.classList.remove('popup_opened');
}

//автозаполнение инпутов в попапе редактирования профиля
function autofillPopupEditProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}


// сохранение изменений в попапе редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEditProfile();
}

// слушатели событий
profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
popupEditProfileForm.addEventListener('submit', formSubmitHandler);

//предзаполнение карточек из массива
initialCards.forEach(element => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__name').textContent = element.name;
  elementsContainer.append(cardElement);
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });
});
