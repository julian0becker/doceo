import React, { useContext, useState } from "react";
import { Form, Segment } from "semantic-ui-react";
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

  console.log(languagesLearning);

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
    console.log("right", rightFormRecipient);
    console.log(e.target.word.value, recipient, formLanguage);
    createMyRequest({
      variables: {
        subject: e.target.word.value.trim(),
        recipients: rightFormRecipient,
        language: formLanguage
      }
    });
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
            <Form.Group>
              <Form.Input
                required
                name="word"
                label="Word / Phrase"
                type="text"
              />
              <Form.Select
                required
                onChange={handleLanguageChange}
                options={languagesLearning}
                name="language"
                label="Language"
                placeholder="language"
              />
              <Form.Dropdown
                required
                label="Recipients"
                onChange={handleRecipientChange}
                multiple
                selection
                options={res}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea label="Description (optional)" />
            </Form.Group>
            <Form.Button inverted>Submit</Form.Button>
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
    $recipients: [RecipientInput]
    $language: String
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
