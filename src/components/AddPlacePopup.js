import PopupWithForm from "./PopupWithForm";
import { useRef, useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const nameRef = useRef();
  const urlRef = useRef();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link: url });
  }

  return (
    <PopupWithForm
      name="create-card"
      title="Novo Local"
      textButton="Criar"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
        <input
          className="popup__input title-input"
          required
          ref={nameRef}
          type="text"
          name="title"
          placeholder="Título"
          onChange={handleNameChange}
          minLength="1"
        />
        <span className="popup__input-error title-input-error"></span>
      </fieldset>
      <fieldset className="popup__field">
        <input
          className="popup__input link-input"
          required
          type="url"
          ref={urlRef}
          id="link-input"
          name="link"
          placeholder="URL da imagem"
          onChange={handleUrlChange}
          minLength="1"
        />
        <span className="popup__input-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
