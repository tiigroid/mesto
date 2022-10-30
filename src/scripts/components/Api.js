export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
    this._checkResponse = (res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    this._catchError = (err) => Promise.reject(err);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { authorization: this._authorization },
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  patchUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  patchUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { authorization: this._authorization },
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: { authorization: this._authorization },
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  putCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: { authorization: this._authorization },
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: { authorization: this._authorization },
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }
}
