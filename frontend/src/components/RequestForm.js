import React, { useContext, useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import { languagesUnsorted } from "../util/languages-dropdown";
import { UserContext } from "../context/user-context";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth-context";
import { useQuery } from "@apollo/react-hooks";

export default function RequestForm() {
  const { languages } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(FETCH_FRIENDS, {
    variables: { name: user.id }
  });

  const friendSelect = friendsArray => {
    let friends = [];
    for (let friend of friendsArray) {
      let object = {};
      object.value = friend.id;
      object.text = friend.username;
      object.key = friend.username;
      friends.push(object);
    }
    return friends;
  };

  if (!loading && !error) {
    var res = friendSelect(data.getProfileInformation.friends);
  }

  const languagesLearning = languagesUnsorted.filter(language => {
    for (let i = 0; i < languages.learning.length; i++) {
      if (languages.learning[i].value === language.value) {
        return true;
      }
    }
  });

  return (
    <Segment inverted>
      <Form inverted>
        <Form.Group>
          <Form.Input label="Word / Phrase" type="text" />
          <Form.Select
            options={languagesLearning}
            label="Language"
            placeholder="language"
          />
          <Form.Dropdown label="Recipients" multiple selection options={res} />
        </Form.Group>
        <Form.Group>
          <Form.TextArea label="Description (optional)" />
        </Form.Group>
        <Form.Button inverted>Submit</Form.Button>
      </Form>
    </Segment>
  );
}

const FETCH_FRIENDS = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      friends {
        id
        username
        languages {
          speaking {
            label
            value
          }
          learning {
            label
            value
          }
        }
      }
    }
  }
`;
