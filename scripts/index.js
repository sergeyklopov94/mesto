// импорт модулей
import {initialCards} from './data.js';
import {formValidators} from './validate.js';
import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';

// карточки на странице
const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements-container');

// кнопки на странице
const profileEditButton = document.querySelector('.edit-button');
const cardAddButton = document.querySelector('.add-button');

// элементы попапа
const popupSections = document.querySelectorAll('.popup');
const popupEditProfileSection = document.querySelector('.popup_edit-profile');
const popupAddCardSection = document.querySelector('.popup_add-cards');
const popupOpenCardSection = document.querySelector('.popup_open-cards');
const popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
const popupAddProfileForm = popupAddCardSection.querySelector('.popup__content');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#about-input');
const imageInput = document.querySelector('#link-input');
const appellationInput = document.querySelector('#appellation-input');
const imageOpen = document.querySelector('.popup__image');
const figcaptureOpen = document.querySelector('.popup__caption');

// текстовые элементы страницы
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// создание экземпляров класса валидации формы
const ProfileFormValidator = new FormValidator(formValidators, popupEditProfileForm);
const CardFormValidator = new FormValidator(formValidators, popupAddProfileForm);

//вызов метода класса валидации для каждого объекта
ProfileFormValidator.enableValidation();
CardFormValidator.enableValidation();

// открытие попапов
function openPopup(popupSection) {
  popupSection.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// функция открытия с предзаполнением полей попапа редактирования профиля
function openProfilePopup() {
  autofillPopupEditProfileInputs();
  ProfileFormValidator.resetFormState();
  openPopup(popupEditProfileSection);
}

// функция открытия попапа добавления карточки
function openAddCardPopup() {
  CardFormValidator.resetFormState();
  openPopup(popupAddCardSection);
}

// функция открытия карточки в масштабе
export function openCardPopup(cardImage) {
  autofillPopupOpenCardSection(cardImage);
  openPopup(popupOpenCardSection);
}

// закрытие попапов
function closePopup(popupSection) {
  popupSection.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа по нажатию на "esc"
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// функция закрытия попапа по нажатию на оверлей
function closePopupByOverlay(evt, popup) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

// автозаполнение инпутов в попапе редактирования профиля
function autofillPopupEditProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// автозаполнение попапа открытия карточки
function autofillPopupOpenCardSection(cardImage) {
  imageOpen.src = cardImage.src;
  imageOpen.alt = cardImage.alt;
  figcaptureOpen.textContent = cardImage.alt;
}

// сохранение изменений в попапе редактирования профиля
function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfileSection);
}

//функция создания карточки
function renderCard(initialCard) {
  // Создадим экземпляр карточки
  const card = new Card(initialCard, cardTemplate);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.createCard();

  return cardElement;
}

// сохранение изменений в попапе добавления карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const initialCard = {
    name: imageInput.value,
    link: appellationInput.value
  };
  elementsContainer.prepend(renderCard(initialCard));
  closePopup(popupAddCardSection);
  popupAddProfileForm.reset();
}

// слушатели событий
profileEditButton.addEventListener('click', openProfilePopup);
cardAddButton.addEventListener('click', openAddCardPopup);
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddProfileForm.addEventListener('submit', addCardFormSubmitHandler);
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
popupSections.forEach(popupSection => {
  popupSection.addEventListener('mousedown', function(evt) {
    closePopupByOverlay(evt, popupSection);
  })
});

// предзаполнение карточек из массива
initialCards.forEach((initialCard) => {
  elementsContainer.append(renderCard(initialCard));
});
