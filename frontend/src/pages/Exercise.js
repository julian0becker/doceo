import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth-context";

function Exercise(props) {
  const exerciseIdContext = props.match.params.id;
  const client = useApolloClient();
  const { user } = useContext(AuthContext);
  const data = client.readQuery({
    query: FETCH_EXERCISE_QUERY,
    variables: { name: user.id }
  });

  const exercise = data.getExercises.filter(ex => ex.id === exerciseIdContext);

  console.log(exercise);
  return (
    <div>
      <h1>single exercise</h1>
      <Link to="/">
        <Button secondary>Back</Button>
      </Link>
    </div>
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
      dialogue {
        meta {
          position
          word
          index
        }
        dialogue {
          sentence
          speaker
          line
        }
      }
    }
  }
`;

export default Exercise;
