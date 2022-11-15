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
