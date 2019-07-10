import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import FriendCard from "../components/FriendCard";
import { Button, Header, Icon, Segment, Image } from "semantic-ui-react";
import { ModalContext } from "../context/modal-context";

function Friends() {
  const { isOpen, openModal, changeModalType } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const {
    data: { getProfileInformation },
    loading
  } = useQuery(FETCH_FRIENDS, {
    variables: { name: user.id }
  });

  const handleOpenModal = () => {
    changeModalType("friends-modal");
    openModal(!isOpen);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <Header as="h2">
            <Icon name="users" />
            <Header.Content>Friends</Header.Content>
          </Header>
        </div>
        <Button secondary onClick={handleOpenModal}>
          Find Friends
        </Button>
      </div>

      {loading ? (
        <Segment loading>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        getProfileInformation.friends.map(friend => (
          <FriendCard key={friend.username} friend={friend} />
        ))
      )}
    </div>
  );
}

const FETCH_FRIENDS = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
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
export default Friends;
