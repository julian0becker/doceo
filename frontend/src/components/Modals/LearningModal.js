import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { countryList } from "../../util/languages-dropdown";
import Select from "react-select";
import { Table, Flag, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { UserContext } from "../../context/user-context";
import { AuthContext } from "../../context/auth-context";
import {
  FETCH_PROFILE_INFORMATION_MODAL,
  UPDATE_LEARNING
} from "../../util/graphql";

export default function SpeakingModal() {
  const { isOpen, openModal } = useContext(ModalContext);
  const { languages } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const [learning, setLearning] = useState(null);
  const [updatingLearning] = useMutation(UPDATE_LEARNING);

  languages.learning.forEach(language => {
    delete language.__typename;
  });

  const handleChange = selectedOption => {
    setLearning(selectedOption);
  };

  const handleApply = () => {
    updatingLearning({
      variables: {
        learning: learning
      },
      update(store, result) {
        const data = store.readQuery({
          query: FETCH_PROFILE_INFORMATION_MODAL,
          variables: { name: user.id }
        });

        data.getProfileInformation.languages.learning = [
          ...result.data.updateLearning.languages.learning
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
    <div className="select-learning">
      <div>
        <Select
          isMulti
          name="languages"
          options={countryList}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          defaultValue={languages.learning}
        />
        {learning && (
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>I speak...</Table.HeaderCell>
                <Table.HeaderCell width={13} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {learning.map(language => (
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
      <div className="button-container-learning">
        <Button onClick={handleApply} secondary>
          Apply
        </Button>
      </div>
    </div>
  );
}
