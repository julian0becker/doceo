import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import Dashboard from "./Dashboard";
import gql from "graphql-tag";
import { UserContext } from "../context/user-context";
import { AuthContext } from "../context/auth-context";
import { useQuery } from "@apollo/react-hooks";

function Body(props) {
  const { user } = useContext(AuthContext);
  const { setLanguages } = useContext(UserContext);
  const { data, loading, error } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  if (!loading && !error) {
    setLanguages(data.getProfileInformation.languages);
  }

  const Component = props.content;
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Dashboard />
        </Grid.Column>
        <Grid.Column width={12}>
          <Component />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Body;

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
