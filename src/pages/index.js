// импорт стилей
import './index.css';

// импорт модулей
import { initialCards } from '../utils/constants.js';
import { formValidators } from '../utils/constants.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo';
import Section from '../components/Section.js';

// импорт переменных
import { profileName,
  profileDescription,
  cardTemplate,
  popupAddCardForm,
  popupEditProfileForm,
  profileEditButton,
  cardAddButton,
  elementsContainer,
  popupAddCardSection,
  popupEditProfileSection,
  popupOpenCardSection
} from '../utils/constants.js';

// функция создания карточки
function renderCard(initialCard) {
  const card = new Card(initialCard, cardTemplate,
    {
      handleCardClick: (image) => {
        popupWithImage.open(image);
      }
    });
  const cardElement = card.createCard();
  return cardElement;
}

// создание экземпляров класса валидации формы
const profileFormValidator = new FormValidator(formValidators, popupEditProfileForm);
const cardFormValidator = new FormValidator(formValidators, popupAddCardForm);

// вызов метода класса валидации для каждого объекта
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// создание экземпляра класса Section и вызов метода для объекта
const cards = new Section({ items: initialCards, renderer: (initialCard) => {
  cards.addItemEnd(renderCard(initialCard))
  }
}, elementsContainer);

cards.renderItems();

// создание экземпляра класса PopupWithForm для попапа добавления карточки и вызов метода для объекта
const popupWithCardForm = new PopupWithForm( {
  handleFormSubmit: (card) => {
    cards.addItemStart(renderCard(card));
    popupWithCardForm.close();
  }
}, popupAddCardSection);

popupWithCardForm.setEventListeners();

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: profileName,
  userAboutSelector: profileDescription });

// создание экземпляра класса PopupWithForm для попапа редактирования профиля и вызов метода для объекта
  const popupWithProfileForm = new PopupWithForm( {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    }
  }, popupEditProfileSection);

  popupWithProfileForm.setEventListeners();

// создание экземпляра класса PopupWithImage и вызов метода для объекта
const popupWithImage = new PopupWithImage(popupOpenCardSection);

popupWithImage.setEventListeners();

// слушатели событий
profileEditButton.addEventListener('click', () => {
  popupWithProfileForm.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetFormState();
  popupWithProfileForm.open();
});

cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetFormState();
  popupWithCardForm.open();
});
