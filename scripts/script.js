const profileEditButton = document.querySelector('.edit-button');
const popupEditProfileSection = document.querySelector('.popup');
const popupEditProfileCloseButton = popupEditProfileSection.querySelector('.popup__close-button');

function openPopupEditProfile() {
  popupEditProfileSection.classList.add('popup_opened');
}

function closePopupEditProfile() {
  popupEditProfileSection.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
