import React, { useContext, useState } from "react";
import { Form, Segment, Grid, Message } from "semantic-ui-react";
import { languagesUnsorted } from "../util/languages-dropdown";
import { UserContext } from "../context/user-context";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth-context";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LoadingBlock from "../components/LoadingBlock";

export default function RequestForm() {
  let res;
  const [recipient, setRecipient] = useState(null);
  const [formLanguage, setFormLanguage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { languages } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(FETCH_FRIENDS, {
    variables: { name: user.id }
  });

  const [createMyRequest] = useMutation(CREATE_REQUEST);

  const friendSelect = friendsArray => {
    let friends = [];
    for (let friend of friendsArray) {
      let object = {};
      object.value = friend.id;
      object.text = friend.username;
      object.key = friend.username;
      friends.push(object);
    }
    return friends;
  };

  if (!loading && !error) {
    res = friendSelect(data.getProfileInformation.friends);
  }

  const languagesLearning = languagesUnsorted.filter(language => {
    for (let i = 0; i < languages.learning.length; i++) {
      if (languages.learning[i].value === language.value) {
        return true;
      }
    }
  });

  const handleOnSubmit = e => {
    e.preventDefault();

    if (
      !recipient ||
      !formLanguage ||
      recipient.length < 1 ||
      e.target.word.value.trim() === ""
    )
      return;
    const rightFormRecipient = recipient.map(r => {
      return { recipientId: r };
    });

    createMyRequest({
      variables: {
        subject: e.target.word.value.trim(),
        recipients: rightFormRecipient,
        language: formLanguage,
        description: e.target.description.value.trim()
      }
    });

    e.target.word.value = "";
    e.target.description.value = "";
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleRecipientChange = (e, { value }) => {
    setRecipient(value);
  };

  const handleLanguageChange = (e, { value }) => {
    setFormLanguage(value);
  };

  return (
    <div>
      {loading ? (
        <LoadingBlock />
      ) : (
        <Segment inverted>
          <Form onSubmit={e => handleOnSubmit(e)} inverted>
            <Grid columns={2}>
              <Grid.Column width={12}>
                <Form.Group>
                  <Form.Input
                    required
                    name="word"
                    label="Word / Phrase"
                    type="text"
                    width={10}
                  />
                  <Form.Select
                    required
                    onChange={handleLanguageChange}
                    options={languagesLearning}
                    name="language"
                    label="Language"
                    width={6}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Dropdown
                    required
                    label="Recipients"
                    onChange={handleRecipientChange}
                    multiple
                    selection
                    options={res}
                    width={16}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    name="description"
                    label="Description (optional)"
                    width={16}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                width={4}
              >
                <h3>Create Request</h3>
                {showSuccess && (
                  <Message
                    info
                    content="Request has been successfully created"
                  />
                )}
                <Form.Button inverted>Submit</Form.Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Segment>
      )}
    </div>
  );
}

const FETCH_FRIENDS = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      friends {
        id
        username
        languages {
          speaking {
            label
            value
          }
          learning {
            label
            value
          }
        }
      }
    }
  }
`;

const CREATE_REQUEST = gql`
  mutation(
    $subject: String!
    $description: String
    $recipients: [RecipientInput!]!
    $language: String!
  ) {
    createRequest(
      subject: $subject
      description: $description
      recipients: $recipients
      language: $language
    ) {
      username
    }
  }
`;
