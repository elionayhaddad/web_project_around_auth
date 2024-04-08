import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import buttonLike from "../images/like.svg";
import iconRemoveCard from "../images/excluir-icon.png";

export default function Card({
  key,
  card,
  click,
  deleteClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__remove-icon ${
    isOwn ? "card__remove-icon_visible" : "card__remove-icon_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : "card__like_inactive"
  }`;

  function handleClick() {
    click(card.name, card.link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    deleteClick();
  }
  return (
    <div className="card" id={card._id} key={key}>
      <div className="card__remove">
        <img
          className={cardDeleteButtonClassName}
          src={iconRemoveCard}
          alt="botão em forma de lixeira"
          onClick={handleDeleteClick}
        />
      </div>
      <div className="card__image-container">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <img
            src={buttonLike}
            className={cardLikeButtonClassName}
            alt="um botão de reação em formato de coração."
            onClick={handleLikeClick}
          />
          <span className="card__counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
