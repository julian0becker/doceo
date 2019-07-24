import React from "react";
import { Button, Form, Segment, Message, Step } from "semantic-ui-react";

export default function DialogueInputStepTwo({
  fields,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  setNext,
  setExerciseData,
  setHandle
}) {
  const handleGoBackToInput = () => {
    setNext(true);
  };

  const handleSelectWord = e => {
    if (e.target.className.includes("word")) {
      e.target.classList.toggle("selected-dialogue-word");
    }
  };

  const handleSubmitSelectedWord = e => {
    const data = [];
    e.target.childNodes.forEach(node => {
      node.childNodes.forEach(innerChildNode => {
        if (innerChildNode.className === "word-box") {
          innerChildNode.childNodes.forEach(lastNode => {
            if (lastNode.className.includes("selected-dialogue-word")) {
              data.push(Object.assign({}, lastNode.dataset));
            }
          });
        }
      });
    });
    if (data.length < 1) {
      setMessage("Must select word.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }
    setExerciseData(data);
    setHandle(false);
  };

  return (
    <Segment inverted>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div />
        <Step.Group>
          <Step completed>
            <Step.Content>
              <Step.Description>Enter Dialogue</Step.Description>
            </Step.Content>
          </Step>
          <Step active>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button inverted onClick={handleGoBackToInput}>
            Back
          </Button>
        </div>
      </div>
      <div
        style={{
          paddingTop: "15px"
        }}
      >
        <Form
          onSubmit={e => handleSubmitSelectedWord(e)}
          onClick={e => handleSelectWord(e)}
        >
          {fields.map((field, index) => (
            <div className="dialogue">
              <span>{field.speaker}: </span>
              <span className="word-box">
                {field.sentence.split(" ").map((word, idx) => (
                  <span
                    className="word"
                    data-position={index}
                    data-word={word}
                    data-index={idx}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px"
            }}
          >
            <div />
            {showMessage && <Message info content={message} />}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button inverted type="submit">
                Select
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Segment>
  );
}
