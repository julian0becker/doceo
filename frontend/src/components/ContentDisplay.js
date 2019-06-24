import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Segment, Header, Icon, Image } from "semantic-ui-react";
import Card from "./Card";
import { AuthContext } from "../context/auth-context";

function ContentDisplay() {
  const { user } = useContext(AuthContext);

  let fetch;
  let variable;
  user ? (fetch = FETCH_EXERCISE_QUERY) : (fetch = FETCH_WELCOME_MESSAGE);
  user ? (variable = user.id) : (variable = null);

  const { loading, data } = useQuery(fetch, {
    variables: { name: variable }
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
            <Segment loading>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
          ) : (
            data.getExercises &&
            data.getExercises.map(exercise => (
              <Grid.Column key={exercise.id} style={{ marginBottom: "20px" }}>
                <Card exercise={exercise} />
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

const FETCH_WELCOME_MESSAGE = gql`
  {
    getExercises(recipientId: "5d0f239d10b2f90000950906") {
      subject
    }
  }
`;

export default ContentDisplay;
