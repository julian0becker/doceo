import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FriendCard from "../FriendCard";

export default function FriendsModal() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await client.query({
        query: FETCH_FRIEND,
        variables: { username: e.target.name.value.trim() }
      });
      if (data.findFriendByUsername) {
        setUserData(data);
        setError(null);
      } else {
        setUserData(null);
        setError("User not found");
      }
    } catch (err) {}
  };

  console.log(error);
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field>
          <h2>Find Friends</h2>
          <input name="name" placeholder="username..." />
        </Form.Field>
        <Button secondary>Submit</Button>
      </Form>
      {error ? (
        <h2>user not found</h2>
      ) : userData ? (
        <FriendCard friend={userData.findFriendByUsername} />
      ) : null}
    </div>
  );
}

const FETCH_FRIEND = gql`
  query($username: String!) {
    findFriendByUsername(username: $username) {
      username
      languages {
        speaking {
          value
          label
        }
        learning {
          value
          label
        }
      }
    }
  }
`;
