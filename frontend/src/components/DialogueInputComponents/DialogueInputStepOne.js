import React from "react";
import { Button, Icon, Form, Segment, Message, Step } from "semantic-ui-react";
export default function DialogueInputStepOne({
  setFields,
  fields,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  setNext
}) {
  const handleChangeSentence = (i, event) => {
    const values = [...fields];
    values[i].sentence = event.target.value;
    setFields(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ sentence: "" });
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

    const values = [...fields];
    values.forEach((value, idx) => {
      if (idx % 2 === 0) {
        return (value.speaker = "A");
      } else {
        return (value.speaker = "B");
      }
    });
    values.forEach((value, idx) => {
      value.position = idx;
      value.sentence = value.sentence.trim();
    });

    setFields(values);
    setNext(false);
  };

  return (
    <Segment inverted>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Step.Group>
          <Step active>
            <Step.Content>
              <Step.Description>Enter Dialogue</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled>
            <Step.Content>
              <Step.Description>{"Select Requested Word(s)"}</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled>
            <Step.Content>
              <Step.Description>Create Dialogue</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
      <div
        style={{
          paddingTop: "15px"
        }}
      >
        <Form onSubmit={e => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div>
              {fields.map((field, idx) => {
                return (
                  <Form.Group key={`${field}-${idx}`}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {idx % 2 === 0 ? "A:" : "B:"}
                    </div>
                    <Form.Input
                      type="text"
                      placeholder="Enter Sentence in Request Language"
                      onChange={e => handleChangeSentence(idx, e)}
                      required
                      value={field.sentence}
                      style={{ width: "100%" }}
                    />

                    <Button
                      inverted
                      type="button"
                      onClick={() => handleRemove(idx)}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Form.Group>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button inverted type="button" onClick={handleAdd}>
              <Icon name="add" /> Another Field
            </Button>
            {showMessage && <Message info content={message} />}
            <Button inverted type="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </Segment>
  );
}
