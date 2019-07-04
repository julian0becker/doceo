import React, { useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function EmailModal() {
  const [updateEmail, { error: err }] = useMutation(UPDATE_EMAIL);
  const { isOpen, openModal } = useContext(ModalContext);

  const handleSubmit = e => {
    e.preventDefault();
    updateEmail({ variables: { email: e.target.updatedEmail.value } });
    openModal(!isOpen);
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="email" name="updatedEmail" />
        <input type="submit" value="update" />
      </form>
    </div>
  );
}

const UPDATE_EMAIL = gql`
  mutation($email: String!) {
    updateEmail(email: $email) {
      email
    }
  }
`;
