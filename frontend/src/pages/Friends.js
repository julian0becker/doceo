import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";

function Friends() {
  const { user } = useContext(AuthContext);
  const { data, error, loading } = useQuery(FETCH_FRIENDS, {
    variables: { name: user.id }
  });

  console.log(data);

  return (
    <div>
      <h1>These are your friends</h1>
      {!loading &&
        data.getProfileInformation.friends.map(friend => friend.username)}
    </div>
  );
}

const FETCH_FRIENDS = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      friends {
        username
        languages {
          speaking {
            label
          }
        }
      }
    }
  }
`;
export default Friends;
