// импорт стилей
import './index.css';

// импорт модулей
import { formValidators } from '../utils/constants.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js'
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

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userAboutSelector: profileDescriptionSelector,
  userAvatarSelector: profileAvatarSelector});

// создание экземпляров класса валидации формы
const profileFormValidator = new FormValidator(formValidators, popupEditProfileForm);
const cardFormValidator = new FormValidator(formValidators, popupAddCardForm);
const avatarFormValidator = new FormValidator(formValidators, popupEditAvatarForm);

// вызов метода класса валидации для каждого объекта
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// создание экземпляра класса Section и вызов метода для объекта
const cards = new Section({ renderer: (initialCard) => {
  cards.addItemEnd(renderCard(initialCard))
  }
}, elementsContainerSelector);

// создание экземпляра класса PopupWithForm для попапа добавления карточки и вызов метода для объекта
const popupWithCardForm = new PopupWithForm({
  handleFormSubmit: (card) => {
    popupWithCardForm.setButtonText('Создание...');
    api.createCard(card)
      .then(res => {
        cards.addItemStart(renderCard(res));
        popupWithCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithCardForm.setButtonText('Создать');
      });
  }
}, popupAddCardSelector);

popupWithCardForm.setEventListeners();

// создание экземпляра класса PopupWithForm для попапа редактирования профиля и вызов метода для объекта
const popupWithProfileForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupWithProfileForm.setButtonText('Сохранение...');
    api.editUserInfo(data)
      .then(res => {
        userInfo.setUserInfo(res);
        popupWithProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithProfileForm.setButtonText('Сохранить');
      });
  }
}, popupEditProfileSelector);

popupWithProfileForm.setEventListeners();

// создание экземпляра класса PopupWithForm для попапа редактирования аватара профиля и вызов метода для объекта
const popupWithAvatarForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupWithAvatarForm.setButtonText('Сохранение...');
    api.editUserAvatar(data)
      .then(res => {
        userInfo.setUserAvatar(res);
        popupWithAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatarForm.setButtonText('Сохранить');
      });
  }
}, popupEditAvatarSelector);

popupWithAvatarForm.setEventListeners();

// создание экземпляра класса PopupWithImage и вызов метода для объекта
const popupWithImage = new PopupWithImage(popupOpenCardSelector);

popupWithImage.setEventListeners();

// создание экземпляра класса PopupWithConfirmation и вызов метода для объекта
const popupWithConfirmation = new PopupWithConfirmation(popupDeleteCardSelector);

popupWithConfirmation.setEventListeners();

// создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-59',
  headers: {
    authorization: '553f0747-650c-4980-b831-611e9b7f89ca',
    'Content-Type': 'application/json'
  }
});

let userId;
// вызовы методов для загрузки карточек и информации о пользователе с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cards.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

  // функция создания карточки
function renderCard(initialCard) {
  const card = new Card(initialCard, cardTemplateSelector, userId,
    {
      handleCardClick: (image) => {
        popupWithImage.open(image);
      }
    },
    {
      handleDeleteClick: (element) => {
        popupWithConfirmation.open(element);
        popupWithConfirmation.handleFormSubmit(() => {
          popupWithConfirmation.setButtonText('Удаление...');
          api.deleteCard(card.getCardId())
            .then(() => {
              card.deleteСard();
              popupWithConfirmation.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupWithConfirmation.setButtonText('Да');
            });
        });
      }
    },
    {
      handleLikeClick: () => {
        if(!(card.checkUserLike())) {
          api.likeCard(card.getCardId())
            .then(res => {
              card.likeCard(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else {
          api.dislikeCard(card.getCardId())
            .then(res => {
              card.likeCard(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  const cardElement = card.createCard();
  return cardElement;
}

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
  avatarFormValidator.resetFormState();
  popupWithAvatarForm.open();
});
