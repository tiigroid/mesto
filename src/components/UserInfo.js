export default class UserInfo {
  constructor ({ name, status }) {
    this._name = name;
    this._status = status;
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
}
