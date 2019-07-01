import React, { createContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  modalType: null,
  openModal: () => {},
  changeModalType: () => {}
});

function ModalProvider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  function openModal(value) {
    setIsOpen(value);
  }

  function changeModalType(value) {
    setModalType(value);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, modalType, changeModalType }}
      {...props}
    />
  );
}

export { ModalContext, ModalProvider };
