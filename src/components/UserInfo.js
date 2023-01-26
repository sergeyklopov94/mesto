export class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
  }

  // публичный метод для возврата объекта с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent
    }
    return userInfo;
  }

  // публичный метод для принятия новых данных пользователя и добавления их на страницу.
  setUserInfo(userInfo) {
    this._userNameSelector.textContent = userInfo.name;
    this._userAboutSelector.textContent = userInfo.about;
  }
}
