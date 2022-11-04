export default class UserInfo {
  constructor ( name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo(data) {
    let user = {};
    user.name = data.name;
    user.about = data.about;
    user.avatar = data.avatar;
    user._id = data._id;
    return user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
