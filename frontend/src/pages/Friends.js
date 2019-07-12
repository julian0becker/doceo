import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import FriendCard from "../components/FriendCard";
import { Button, Header, Icon } from "semantic-ui-react";
import { ModalContext } from "../context/modal-context";
import LoadingBlock from "../components/LoadingBlock";

function Friends() {
  const { isOpen, openModal, changeModalType } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(FETCH_FRIENDS, {
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
        <LoadingBlock />
      ) : (
        data.getProfileInformation.friends.map(friend => (
          <FriendCard
            key={friend.username}
            friend={friend}
            deleteFriend={true}
          />
        ))
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
export default Friends;
