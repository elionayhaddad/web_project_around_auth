import { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [image, setImage] = useState("");
  const ImageRef = useRef();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setImage(currentUser.avatar);
  }, []);

  function handleChange(e) {
    setImage(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: image });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Atualizar foto do perfil"
      textButton="Salvar"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__field">
        <input
          className="form__input form__input_photo-user"
          required
          ref={ImageRef}
          type="url"
          name="link"
          defaultValue={image}
          placeholder="URL da imagem"
          minLength="1"
          onChange={handleChange}
        />
        <span className="form__input-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
