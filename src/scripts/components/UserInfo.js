export default class UserInfo {
  constructor ({ name, status }, avatarSelector) {
    this._name = name;
    this._status = status;
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.status = this._status.textContent;
    return userInfo;
  }

  setUserInfo(inputValues) {
    this._name.textContent = inputValues.name;
    this._status.textContent = inputValues.status;
  }

  changeUserAvatar(inputValues) {
    this._avatar.src = inputValues.avatar;
  }
}
