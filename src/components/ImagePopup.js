import buttonClose from "../images/close-icon.png";

export default function ImagePopup(props) {
  return (
    <div
      className={
        props.card ? "popup popup_is-opened" : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__overflow" id="overflow-image"></div>
      <div className="popup__container-image">
        <img
          className="button button_close button_close_image"
          src={buttonClose}
          onClick={props.onClose}
          alt="botão fechar"
        />
        <img
          className="popup__link-image"
          src={props.card.url}
          alt={props.card.name}
        />
        <p className="popup__legend-image">{props.card.name}</p>
      </div>
    </div>
  );
}
