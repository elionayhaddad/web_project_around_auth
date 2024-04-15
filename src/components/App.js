import { useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isRemCardPopupOpen, setIsRemCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [element, setElement] = useState([]);
  const newHistory = createBrowserHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((erro) => {
        console.log("Quebrou no [GET] /users/me");
        console.log(erro);
      });

    api
      .getCard()
      .then((data) => {
        setCards(data);
      })
      .catch((erro) => {
        console.log("Quebrou no [GET] /cards");
        console.log(erro);
        setCards([]);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(name, url) {
    setSelectedCard({ name, url });
  }
  function handleRemCardClick() {
    setIsRemCardPopupOpen(true);
  }
  function handleEscClose(e) {
    if (e.key === "Escape") {
      window.addEventListener("keyup", closeAllPopups);
    }
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
    setIsRemCardPopupOpen(false);
    window.removeEventListener("keyup", closeAllPopups);
  }
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((erro) => {
        console.log("Quebrou no [PATCH] /users/me");
        console.log(erro);
      });

    closeAllPopups();
  }
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((erro) => {
        console.log("Quebrou no [PATCH] /users/me/avatar");
        console.log(erro);
      });

    closeAllPopups();
  }
  function getCard(card) {
    setElement(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCards(element._id).then(() => {
      const newArrCards = cards.filter((card) => card._id !== element._id);
      setCards(newArrCards);
      closeAllPopups();
    });
  }
  function handleAddPlaceSubmit(card) {
    api
      .createCards(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((erro) => {
        console.log("Quebrou no [POST] /cards");
        console.log(erro);
      });

    closeAllPopups();
  }

  async function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      try {
        const res = await auth.checkToken(token);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="App" onKeyDown={(e) => handleEscClose(e)} tabIndex={-1}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} />
          <Route exact path="/" history={newHistory}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onRemCardClick={handleRemCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={getCard}
            ></Main>
          </Route>

          <Route path="/login" history={newHistory}>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/register" history={newHistory}>
            <Register />
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup
          name="image"
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>

        <DeleteCardPopup
          isOpen={isRemCardPopupOpen}
          onClose={closeAllPopups}
          card={element}
          onSubmit={handleCardDelete}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
/* "homepage": "https://elionayhaddad.github.io/web_project_around_auth",*/