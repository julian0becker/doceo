import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Header, Icon } from "semantic-ui-react";
import Card from "./Card";
import { AuthContext } from "../context/auth-context";
import LoadingBlock from "./LoadingBlock";
import { Link } from "react-router-dom";

function ContentDisplay() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_EXERCISE_QUERY, {
    variables: { name: user.id },
    fetchPolicy: "cache-and-network"
  });

  return (
    <Grid columns={3}>
      <React.Fragment>
        <Grid.Row>
          <Header as="h2">
            <Icon name="book" />
            <Header.Content>Exercises</Header.Content>
          </Header>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <LoadingBlock />
          ) : (
            data.getExercises &&
            data.getExercises.map(exercise => (
              <Grid.Column key={exercise.id} style={{ marginBottom: "20px" }}>
                {" "}
                <Link to={`/exercise/${exercise.id}`}>
                  <Card exercise={exercise} />
                </Link>
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </React.Fragment>
    </Grid>
  );
}

const FETCH_EXERCISE_QUERY = gql`
  query($name: ID!) {
    getExercises(recipientId: $name) {
      subject
      id
      createdAt
      description
      username
      sentences {
        sentence
        translation
      }
    }
  }
`;

export default ContentDisplay;
