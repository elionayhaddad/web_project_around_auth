import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, onClose, onSubmit }) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Tem certeza?"
      textButton="Sim"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
