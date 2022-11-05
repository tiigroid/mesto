export default class UserInfo {
  constructor ( name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  setUserInfo(data) {
    this._id = data._id;
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserInfo() {
    const user = {};
    user.name = this._name.textContent;
    user.about = this._about.textContent;;
    user.avatar = this._avatar.src;
    user._id = this._id;
    return user;
  }
}
