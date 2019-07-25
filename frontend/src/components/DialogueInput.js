import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DialogueInputStepOne from "./DialogueInputComponents/DialogueInputStepOne";
import DialogueInputStepTwo from "./DialogueInputComponents/DialogueInputStepTwo";
import DialogueInputStepThree from "./DialogueInputComponents/DialogueInputStepThree";


export default function DynamicInput({ data }) {
  const [fields, setFields] = useState([{ sentence: "" }, { sentence: "" }]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [next, setNext] = useState(true);
  const [handle, setHandle] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [creatingExercise, { loading }] = useMutation(CREATE_EXERCISE);

  const handleCreateExercise = () => {
    creatingExercise({
      variables: {
        subject: data.subject,
        description: data.description,
        dialogue: {
          meta: exerciseData,
          dialogue: fields
        },
        recipients: [{ recipientId: data.user.id }]
      },
      update(proxy, store) {
        setDisableSubmit(true);
        setMessage("Exercise successfully created!");
        setShowMessage(true);
      }
    });
  };

  return (
    <div>
      {next ? (
        <DialogueInputStepOne
          setFields={setFields}
          fields={fields}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          message={message}
          setMessage={setMessage}
          setNext={setNext}
        />
      ) : handle ? (
        <DialogueInputStepTwo
          fields={fields}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          message={message}
          setMessage={setMessage}
          setNext={setNext}
          setExerciseData={setExerciseData}
          setHandle={setHandle}
        />
      ) : (
        <DialogueInputStepThree
          setHandle={setHandle}
          fields={fields}
          exerciseData={exerciseData}
          handleCreateExercise={handleCreateExercise}
          message={message}
          disableSubmit={disableSubmit}
          showMessage={showMessage}
          setDisableSubmit={setDisableSubmit}
          setShowMessage={setShowMessage}
        />
      )}
    </div>
  );
}

const CREATE_EXERCISE = gql`
  mutation(
    $subject: String!
    $description: String
    $dialogue: DialogueInput
    $recipients: [RecipientExerciseInput!]!
  ) {
    createExercise(
      subject: $subject
      description: $description
      dialogue: $dialogue
      recipients: $recipients
    ) {
      username
    }
  }
`;
