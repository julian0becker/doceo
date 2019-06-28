import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_PROFILE_INFORMATION } from "../util/graphql";

function EditProfileForm() {
  const [updatingProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    update(proxy, result) {
      // const data = proxy.readQuery({
      //   query: gql`
      //     query($name: ID!) {
      //       getProfileInformation(userId: $name) {
      //         username
      //         email
      //         createdAt
      //         languages {
      //           speaking
      //           learning
      //         }
      //       }
      //     }
      //   `
      // });
      // console.log(data);
    },
    variables: {
      email: "ciao@hallo.de",
      speaking: ["versuch2", "def"],
      learning: ["ghi", "jkl"]
    }
  });

  const onSubmit = event => {
    event.preventDefault();
    updatingProfile();
  };

  return (
    <Form onSubmit={onSubmit}>
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
    updateProfile(
      email: $email
      languageInput: { speaking: $speaking, learning: $learning }
    ) {
      email
    }
  }
`;

export default EditProfileForm;
