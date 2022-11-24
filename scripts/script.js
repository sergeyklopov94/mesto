const initialCards = [
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

const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements-container');
const profileEditButton = document.querySelector('.edit-button');
let popupEditProfileSection = document.querySelector('.popup');
let popupEditProfileForm = popupEditProfileSection.querySelector('.popup__content');
const popupEditProfileCloseButton = popupEditProfileSection.querySelector('.popup__close-button');
let popupEditProfileInfoInputList = popupEditProfileSection.querySelectorAll('.popup__info');
let nameInput = popupEditProfileInfoInputList[0];
let jobInput = popupEditProfileInfoInputList[1];
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopupEditProfile() {
  popupEditProfileSection.classList.add('popup_opened');
  autofillPopupEditProfileInputs();
}

function closePopupEditProfile() {
  popupEditProfileSection.classList.remove('popup_opened');
}

function autofillPopupEditProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupEditProfile();
}

profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
popupEditProfileForm.addEventListener('submit', formSubmitHandler);

initialCards.forEach(element => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__name').textContent = element.name;
  elementsContainer.append(cardElement);
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
});
