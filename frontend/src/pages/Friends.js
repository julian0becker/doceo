import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import FriendCard from "../components/FriendCard";
import { Button } from "semantic-ui-react";
import { ModalContext } from "../context/modal-context";

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
      <h1>These are your friends</h1>
      <Button secondary onClick={handleOpenModal}>
        Find Friends
      </Button>
      {!loading &&
        data.getProfileInformation.friends.map(friend => (
          <FriendCard key={friend.username} friend={friend} />
        ))}
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
