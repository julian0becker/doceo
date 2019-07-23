import React, { useState } from "react";
import { Button, Icon, Form, Segment, Message, Step } from "semantic-ui-react";

export default function DynamicInput() {
  const [fields, setFields] = useState([{ sentence: "" }, { sentence: "" }]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [next, setNext] = useState(true);
  const [handle, setHandle] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);

  const handleChangeSentence = (i, event) => {
    const values = [...fields];
    values[i].sentence = event.target.value;

    setFields(values);
  };

  console.log(exerciseData);
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

    // setFields([{ sentence: "" }, { sentence: "" }]);
    // setMessage("Request has successfully been created.");
    // setShowMessage(true);
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 3000);
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
              data.push(lastNode.dataset);
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

  const handleGoBackToInput = () => {
    setNext(true);
  };

  const handleGoBackToSelect = () => {
    setHandle(true);
  };

  return (
    <div>
      {next ? (
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
                  <Step.Description>
                    {"Select Requested Word(s)"}
                  </Step.Description>
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
                          style={{ witdh: "100%" }}
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
      ) : handle ? (
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
                  <Step.Description>
                    {"Select Requested Word(s)"}
                  </Step.Description>
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
      ) : (
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
                  <Step.Description>
                    {"Select Requested Word(s)"}
                  </Step.Description>
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
                  <span>{`${domString.word} (line #${parseInt(
                    domString.position
                  ) + 1} `}</span>
                  <span>{`position #${parseInt(domString.index) + 1})`}</span>
                </li>
              ))}
            </ul>
          </div>
        </Segment>
      )}
    </div>
  );
}
