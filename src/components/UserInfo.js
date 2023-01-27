export class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
  }

  // публичный метод для возврата объекта с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
    return userInfo;
  }

  // публичный метод для принятия новых данных пользователя и добавления их на страницу.
  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userAbout.textContent = userInfo.about;
  }
}
