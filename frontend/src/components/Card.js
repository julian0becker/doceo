import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";

function ExerciseCard({ exercise }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{exercise.subject}</Card.Header>
        <Card.Meta>{moment(exercise.createdAt).fromNow()}</Card.Meta>
        <Card.Description>from {exercise.username}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default ExerciseCard;
