import React, { useContext } from "react";
import ReactModal from "react-modal";
import { ModalContext } from "../context/modal-context";
import EmailModal from "./Modals/EmailModal";
import SpeakingModal from "./Modals/SpeakingModal";
import LearningModal from "./Modals/LearningModal";

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    width: "50vw",
    height: "50vh"
  }
};

export default function Modal() {
  const { isOpen, openModal, modalType } = useContext(ModalContext);
  const handleClick = () => {
    openModal(!isOpen);
  };

  let ModalType;
  switch (modalType) {
    case "email-modal":
      ModalType = EmailModal;
      break;
    case "speaking-modal":
      ModalType = SpeakingModal;
      break;
    case "learning-modal":
      ModalType = LearningModal;
      break;
    default:
      break;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Modal different Options"
      style={customStyles}
      onRequestClose={handleClick}
    >
      {ModalType && <ModalType />}
    </ReactModal>
  );
}
