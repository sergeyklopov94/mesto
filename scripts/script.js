const profileEditButton = document.querySelector('.edit-button');
const popupEditProfileSection = document.querySelector('.popup');
const popupEditProfileCloseButton = popupEditProfileSection.querySelector('.popup__close-button');
const popupEditProfileInfoInputList = popupEditProfileSection.querySelectorAll('.popup__info');
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
  popupEditProfileInfoInputList[0].value = profileName.textContent;
  popupEditProfileInfoInputList[1].value = profileDescription.textContent;
}

profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
