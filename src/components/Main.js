import { useContext } from "react";
import Card from "./Card.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import buttonEdit from "../images/button__edit.svg";
import buttonNewPlace from "../images/more.svg";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <img
            id="artist"
            src={currentUser.avatar}
            className="profile__image photo-hover"
            alt="foto de perfil do usuário"
          />
          <div
            className="profile__overlay"
            onClick={props.onEditAvatarClick}
          ></div>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h2 className="profile__artist">{currentUser.name}</h2>
              <button
                className="button button_profile"
                type="submit"
                onClick={props.onEditProfileClick}
              >
                <img
                  id="edition"
                  className="button__profile-image"
                  src={buttonEdit}
                  alt="lápis"
                />
              </button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button
            className="button button_add"
            type="submit"
            onClick={props.onAddPlaceClick}
          >
            <img
              id="create-card"
              className="button__add-image"
              src={buttonNewPlace}
              alt="sinal de adição"
            />
          </button>
        </section>
        <section className="cards">
          {props.cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              click={props.onCardClick}
              deleteClick={props.onRemCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}
