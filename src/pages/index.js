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
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import Section from '../components/Section.js';

// импорт переменных
import { profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  cardTemplateSelector,
  popupAddCardForm,
  popupEditProfileForm,
  popupEditAvatarForm,
  profileEditButton,
  profileAvatarEditButton,
  cardAddButton,
  elementsContainerSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupOpenCardSelector,
  popupDeleteCardSelector
} from '../utils/constants.js';

// функция создания карточки
function renderCard(initialCard) {
  const card = new Card(initialCard, cardTemplateSelector,
    {
      handleCardClick: (image) => {
        popupWithImage.open(image);
      }
    },
    {
      handleDeleteClick: (card) => {
        popupWithConfirmation.open(card);
      }
    });
  const cardElement = card.createCard();
  return cardElement;
}

// создание экземпляров класса валидации формы
const profileFormValidator = new FormValidator(formValidators, popupEditProfileForm);
const cardFormValidator = new FormValidator(formValidators, popupAddCardForm);
const avatarFormValidator = new FormValidator(formValidators, popupEditAvatarForm);

// вызов метода класса валидации для каждого объекта
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// создание экземпляра класса Section и вызов метода для объекта
const cards = new Section({ items: initialCards, renderer: (initialCard) => {
  cards.addItemEnd(renderCard(initialCard))
  }
}, elementsContainerSelector);

cards.renderItems();

// создание экземпляра класса PopupWithForm для попапа добавления карточки и вызов метода для объекта
const popupWithCardForm = new PopupWithForm( {
  handleFormSubmit: (card) => {
    cards.addItemStart(renderCard(card));
    popupWithCardForm.close();
  }
}, popupAddCardSelector);

popupWithCardForm.setEventListeners();

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userAboutSelector: profileDescriptionSelector,
  userAvatarSelector: profileAvatarSelector});

// создание экземпляра класса PopupWithForm для попапа редактирования профиля и вызов метода для объекта
  const popupWithProfileForm = new PopupWithForm( {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    }
  }, popupEditProfileSelector);

  popupWithProfileForm.setEventListeners();

// создание экземпляра класса PopupWithForm для попапа редактирования аватара профиля и вызов метода для объекта
  const popupWithAvatarForm = new PopupWithForm( {
    handleFormSubmit: (data) => {
      userInfo.setUserAvatar(data);
      popupWithAvatarForm.close();
    }
  }, popupEditAvatarSelector);

  popupWithAvatarForm.setEventListeners();

// создание экземпляра класса PopupWithImage и вызов метода для объекта
const popupWithImage = new PopupWithImage(popupOpenCardSelector);

popupWithImage.setEventListeners();

// создание экземпляра класса PopupWithConfirmation и вызов метода для объекта
const popupWithConfirmation = new PopupWithConfirmation(popupDeleteCardSelector, {
  handleFormSubmit: (card) => {

    popupWithConfirmation.close();
  }
});

popupWithConfirmation.setEventListeners();

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

profileAvatarEditButton.addEventListener('click', () => {
  popupWithAvatarForm.open();
});
