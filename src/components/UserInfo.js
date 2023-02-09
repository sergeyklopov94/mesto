export class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  // публичный метод для возврата объекта с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
    return userInfo;
  }

  // публичный метод для принятия новых данных пользователя и добавления их на страницу
  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userAbout.textContent = userInfo.about;
    this._userId = userInfo._id;
  }

  // публичный метод для принятия нового аватара и добавления его на страницу
  setUserAvatar(userInfo) {
    this._userAvatar.src = userInfo.avatar;
  }

  // публичный метод для получения Id пользователя
  getUserId() {
    return this._userId;
  }
}
