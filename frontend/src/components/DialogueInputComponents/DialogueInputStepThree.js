import React from "react";
import { Button, Segment, Step } from "semantic-ui-react";

export default function DialogueInputStepThree({
  setHandle,
  exerciseData,
  fields
}) {
  const handleGoBackToSelect = () => {
    setHandle(true);
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
          <Step completed>
            <Step.Content>
              <Step.Description>{"Select Requested Word(s)"}</Step.Description>
            </Step.Content>
          </Step>
          <Step active>
            <Step.Content>
              <Step.Description>Create Dialogue</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button inverted onClick={handleGoBackToSelect}>
            Back
          </Button>
        </div>
      </div>
      <div>
        <div style={{ padding: "15px 0" }}>
          {fields.map(field => (
            <div>
              <span>{field.speaker}: </span>
              <span>{field.sentence}</span>
            </div>
          ))}
        </div>
        <div>{`Problem word(s):`}</div>
        <ul>
          {exerciseData.map(domString => (
            <li>
              <span>{`${domString.word} (line #${parseInt(domString.position) +
                1} `}</span>
              <span>{`position #${parseInt(domString.index) + 1})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </Segment>
  );
}
