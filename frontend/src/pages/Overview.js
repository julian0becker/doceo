import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import gql from "graphql-tag";
import { UserContext } from "../context/user-context";

function Overview() {
  const { user } = useContext(AuthContext);
  const { setLanguages } = useContext(UserContext);
  const { data, loading, error } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  if (!loading && !error) {
    setLanguages(data.getProfileInformation.languages);
  }
  return (
    <div>
      <h1>This is your Overview</h1>
    </div>
  );
}

const FETCH_PROFILE_INFORMATION = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
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

export default Overview;
