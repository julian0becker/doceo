import React, { useState } from "react";
import { Form, Button, Icon, Segment, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function TranslationInput({ data }) {
  const [fields, setFields] = useState([{ sentence: "", translation: "" }]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [creatingExercise, { loading }] = useMutation(CREATE_EXERCISE, {
    variables: {
      subject: data.subject,
      description: data.description,
      sentences: fields,
      recipients: [{ recipientId: data.user.id }]
    }
  });

  const handleChangeSentence = (i, event) => {
    const values = [...fields];
    values[i].sentence = event.target.value;
    setFields(values);
  };

  const handleChangeTranslation = (i, event) => {
    const values = [...fields];
    values[i].translation = event.target.value;
    setFields(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ sentence: "", translation: "" });
    setFields(values);
  };

  const handleRemove = i => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (fields.length < 1) {
      setMessage("Input Missing.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }
    creatingExercise();
    setFields([{ sentence: "", translation: "" }]);
    setMessage("Request has successfully been created.");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <Segment inverted>
      <Form onSubmit={e => handleSubmit(e)}>
        {fields.map((field, idx) => {
          return (
            <Form.Group key={`${field}-${idx}`}>
              <Form.Input
                type="text"
                placeholder="Enter Sentence in Request Language"
                onChange={e => handleChangeSentence(idx, e)}
                required
                value={field.sentence}
                width={7}
              />

              <Form.Input
                type="text"
                placeholder="Enter Translation in Common Language"
                onChange={e => handleChangeTranslation(idx, e)}
                required
                value={field.translation}
                width={7}
              />
              <Button type="button" onClick={() => handleRemove(idx)}>
                <Icon name="delete" />
              </Button>
            </Form.Group>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button secondary type="button" onClick={handleAdd}>
            <Icon name="add" /> Another Sentence
          </Button>
          {showMessage && <Message info content={message} />}
          <Button disabled={loading} secondary type="submit">
            Create Exercise
          </Button>
        </div>
      </Form>
    </Segment>
  );
}

const CREATE_EXERCISE = gql`
  mutation(
    $subject: String!
    $description: String
    $sentences: [SentenceInput!]!
    $recipients: [RecipientExerciseInput!]!
  ) {
    createExercise(
      subject: $subject
      description: $description
      sentences: $sentences
      recipients: $recipients
    ) {
      username
    }
  }
`;
