import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Select from "react-select";
import { Table, Flag, Button } from "semantic-ui-react";
import { ModalContext } from "../../context/modal-context";
import { UserContext } from "../../context/user-context";
import { AuthContext } from "../../context/auth-context";
import {
  FETCH_PROFILE_INFORMATION_MODAL,
  UPDATE_SPEAKING
} from "../../util/graphql";
import { countryList } from "../../util/languages-dropdown";

export default function SpeakingModal() {
  const { isOpen, openModal } = useContext(ModalContext);
  const { languages } = useContext(UserContext);
  const [speaking, setSpeaking] = useState(null);
  const { user } = useContext(AuthContext);

  const [updatingSpeaking] = useMutation(UPDATE_SPEAKING);

  languages.speaking.forEach(language => {
    delete language.__typename;
  });

  const handleChange = selectedOption => {
    setSpeaking(selectedOption);
  };

  const handleApply = () => {
    updatingSpeaking({
      variables: {
        speaking: speaking
      },
      update(store, result) {
        const data = store.readQuery({
          query: FETCH_PROFILE_INFORMATION_MODAL,
          variables: { name: user.id }
        });

        data.getProfileInformation.languages.speaking = [
          ...result.data.updateSpeaking.languages.speaking
        ];

        store.writeQuery({
          query: FETCH_PROFILE_INFORMATION_MODAL,
          variables: { name: user.id },
          data: data
        });
      }
    });
    openModal(!isOpen);
  };

  return (
    <div className="select-speaking">
      <div>
        <Select
          isMulti
          name="languages"
          options={countryList}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          defaultValue={languages.speaking}
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
                <Table.Row key={language.value}>
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
        <Button onClick={handleApply} secondary>
          Apply
        </Button>
      </div>
    </div>
  );
}
