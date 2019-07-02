import React, { useState } from "react";
import { countryList } from "../../util/languages-dropdown";
import Select from "react-select";
import { Table, Flag, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export default function SpeakingModal() {
  const [speaking, setSpeaking] = useState(null);
  const [updatingSpeaking, { error }] = useMutation(UPDATE_SPEAKING);

  const handleChange = selectedOption => {
    setSpeaking(selectedOption);
  };

  const handleOnclick = e => {
    console.log("hi");
    updatingSpeaking();
  };

  console.log(speaking);

  return (
    <div className="select-speaking">
      <div>
        <Select
          isMulti
          name="colors"
          options={countryList}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />
        {speaking && (
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>I speak...</Table.HeaderCell>
                <Table.HeaderCell width={13} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {speaking.map(language => (
                <Table.Row>
                  <Table.Cell>
                    <Flag name={language.value} />
                  </Table.Cell>
                  <Table.Cell>{language.label}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
      <div className="button-container-speaking">
        <Button onClick={e => handleOnclick(e)} secondary>
          Apply
        </Button>
      </div>
    </div>
  );
}

const UPDATE_SPEAKING = gql`
  mutation {
    updateSpeaking(
      speaking: [
        { value: "jsj", label: "jss" }
        { value: "hdhhdh", label: "dhddjjd" }
      ]
    ) {
      email
    }
  }
`;
