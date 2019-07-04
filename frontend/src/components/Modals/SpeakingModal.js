import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { countryList } from "../../util/languages-dropdown";
import Select from "react-select";
import { Table, Flag, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UserContext } from "../../context/user-context";
import { AuthContext } from "../../context/auth-context";

export default function SpeakingModal() {
  const { isOpen, openModal } = useContext(ModalContext);
  const { languages, setLanguages } = useContext(UserContext);
  const [speaking, setSpeaking] = useState(null);
  // const { user } = useContext(AuthContext);

  // const { data, error, loading } = useQuery(FETCH_PROFILE_INFORMATION, {
  //   variables: { name: user.id }
  // });

  // console.log("data", data.getProfileInformation.languages);
  const [updatingSpeaking, { error: err }] = useMutation(UPDATE_SPEAKING);

  languages.speaking.forEach(language => {
    delete language.__typename;
  });

  const handleChange = selectedOption => {
    setSpeaking(selectedOption);
  };

  const handleOnclick = e => {
    updatingSpeaking({
      variables: {
        speaking: speaking
      }
    });
    openModal(!isOpen);
  };

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
  mutation($speaking: [SpeakingInput!]!) {
    updateSpeaking(speaking: $speaking) {
      email
    }
  }
`;

const FETCH_PROFILE_INFORMATION = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      languages {
        speaking {
          value
          label
        }
        learning {
          value
          label
        }
      }
    }
  }
`;
