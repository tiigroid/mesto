export default class UserInfo {
  constructor (name, about, avatar, api) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._api = api;
  }

  getUserInfo() {
    const user = {};
    user.name = this._name.textContent;
    user.about = this._about.textContent;
    return user;
  }

  setUserInfo() {
    this._api.getUserData()
    .then((data) => this.renderUserInfo(data))
  }

  renderUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar() {
    this._api.getUserData()
    .then((data) => this.renderUserAvatar(data))
  }

  renderUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
