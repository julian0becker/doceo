import React, { useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_PROFILE_INFORMATION_MODAL_EMAIL } from "../../util/graphql";
import { AuthContext } from "../../context/auth-context";

export default function EmailModal() {
  const [updateEmail] = useMutation(UPDATE_EMAIL);
  const { isOpen, openModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    updateEmail({
      variables: { email: e.target.updatedEmail.value },
      update(store, result) {
        const data = store.readQuery({
          query: FETCH_PROFILE_INFORMATION_MODAL_EMAIL,
          variables: { name: user.id }
        });

        data.getProfileInformation.email = result.data.updateEmail.email;

        store.writeQuery({
          query: FETCH_PROFILE_INFORMATION_MODAL_EMAIL,
          variables: { name: user.id },
          data: data
        });
      }
    });
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
