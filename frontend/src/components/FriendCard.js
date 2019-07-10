import React, { useContext } from "react";
import { Segment, Image, List, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth-context";
import { ModalContext } from "../context/modal-context";

export default function FriendCard({ friend, search }) {
  const { user } = useContext(AuthContext);
  const { isOpen, openModal } = useContext(ModalContext);
  const [addFriend] = useMutation(ADD_FRIEND);

  const handleAddFriend = () => {
    addFriend({
      variables: { friendId: friend.id },
      refetchQueries: [{ query: FETCH_FRIENDS, variables: { name: user.id } }]
    });
    openModal(!isOpen);
  };

  return (
    <Segment style={{ display: "flex", justifyContent: "space-between" }}>
      <List>
        <List.Item>
          <Image
            circular
            size="tiny"
            src="https://react.semantic-ui.com/images/avatar/large/chris.jpg"
          />
          <List.Content>
            <List.Header>{friend.username}</List.Header>
            <List.Description>
              <div>
                Speaks:{" "}
                {friend.languages.speaking.map(language => (
                  <span key={language.value} style={{ marginRight: "5px" }}>
                    {language.label}
                  </span>
                ))}
              </div>
              <div>
                Learns:{" "}
                {friend.languages.learning.map(language => (
                  <span key={language.value} style={{ marginRight: "5px" }}>
                    {language.label}
                  </span>
                ))}
              </div>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
      {search && (
        <div>
          <Button onClick={handleAddFriend} secondary>
            Add Friend
          </Button>
        </div>
      )}
    </Segment>
  );
}

const ADD_FRIEND = gql`
  mutation($friendId: String!) {
    addOneFriend(friendId: $friendId) {
      friends {
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

const FETCH_FRIENDS = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      id
      friends {
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
