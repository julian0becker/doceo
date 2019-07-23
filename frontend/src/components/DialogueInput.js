import React, { useState } from "react";
import DialogueInputStepOne from "./DialogueInputComponents/DialogueInputStepOne";
import DialogueInputStepTwo from "./DialogueInputComponents/DialogueInputStepTwo";
import DialogueInputStepThree from "./DialogueInputComponents/DialogueInputStepThree";

export default function DynamicInput() {
  const [fields, setFields] = useState([{ sentence: "" }, { sentence: "" }]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [next, setNext] = useState(true);
  const [handle, setHandle] = useState(true);
  const [exerciseData, setExerciseData] = useState(null);

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
        />
      )}
    </div>
  );
}
