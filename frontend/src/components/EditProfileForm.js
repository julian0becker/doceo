import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";

function EditProfileForm() {
  // const { values, onChange, onSubmit } = useForm(createUpdateCallback, {
  //   email: ""
  // });
  const [updatingProfile, { loading }] = useMutation(UPDATE_PROFILE);

  return (
    <Form>
      <Form.Field>
        <label>Email</label>
        <input name="email" placeholder="First Name" />
      </Form.Field>
      <Button type="submit" secondary>
        Submit
      </Button>
    </Form>
  );
}

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $email: String!
    $speaking: [String!]!
    $learning: [String!]!
  ) {
    login(
      email: $email
      languageInput: { speaking: $speaking, learning: $learning }
    ) {
      email
    }
  }
`;

export default EditProfileForm;
