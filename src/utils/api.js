class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  getCard() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  createCards(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(card),
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  changeLikeCardStatus(cardId, status) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: `${status ? "PUT" : "DELETE"}`,
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  deleteCards(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  updateAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(url),
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_04",
  headers: {
    authorization: "1c439799-4201-41a1-bc23-3ac75b525bca",
    "Content-type": "application/json",
  },
});

export default api;
