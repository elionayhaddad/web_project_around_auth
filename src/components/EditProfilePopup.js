import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar Perfil"
      textButton="Salvar"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
        <input
          className="popup__input name-input"
          required
          type="text"
          name="name"
          defaultValue={name}
          placeholder="Nome"
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error"></span>
      </fieldset>
      <fieldset className="popup__field">
        <input
          className="popup__input role-input"
          type="text"
          required
          name="about"
          defaultValue={description}
          placeholder="Função"
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error role-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
