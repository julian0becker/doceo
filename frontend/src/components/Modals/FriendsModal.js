import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function FriendsModal() {
  const [userData, setUserData] = useState(null);
  const client = useApolloClient();

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await client.query({
        query: gql`
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
        `,
        variables: { username: e.target.name.value.trim() }
      });
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userData);

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field>
          <h2>Find Friends</h2>
          <input name="name" placeholder="username..." />
        </Form.Field>
        <Button secondary>Submit</Button>
      </Form>
    </div>
  );
}
