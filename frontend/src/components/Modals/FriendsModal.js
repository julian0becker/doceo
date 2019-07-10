import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FriendCard from "../FriendCard";
import { AuthContext } from "../../context/auth-context";

export default function FriendsModal() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();
  const { user } = useContext(AuthContext);

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (user.username === e.target.name.value.trim()) {
      setError("I hope you already are friends with yourself");
      return;
    }
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
        <h2>{error}</h2>
      ) : userData ? (
        <div>
          <FriendCard search={true} friend={userData.findFriendByUsername} />
        </div>
      ) : null}
    </div>
  );
}

const FETCH_FRIEND = gql`
  query($username: String!) {
    findFriendByUsername(username: $username) {
      id
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
