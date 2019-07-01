import React, { useState } from "react";
import { countryList } from "../../util/languages-dropdown";
import Select from "react-select";
import { Table, Flag, Button } from "semantic-ui-react";

export default function SpeakingModal() {
  const [speaking, setSpeaking] = useState(null);

  const handleChange = selectedOption => {
    setSpeaking(selectedOption);
  };

  console.log(speaking);

  return (
    <div className="select-speaking">
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
      <Button secondary>Apply</Button>
    </div>
  );
}
