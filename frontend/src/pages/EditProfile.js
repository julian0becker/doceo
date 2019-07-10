import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import ProfileDetails from "../components/ProfileDetails";
import gql from "graphql-tag";
import { UserContext } from "../context/user-context";
import { Header, Icon, Segment, Image } from "semantic-ui-react";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const { setLanguages } = useContext(UserContext);

  const { data, loading } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  if (!loading) {
    setLanguages(data.getProfileInformation.languages);
  }

  return (
    <div className="profile-page">
      <Header as="h2">
        <Icon name="settings" />
        <Header.Content>Settings</Header.Content>
      </Header>
      {loading ? (
        <Segment loading>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        <ProfileDetails info={data.getProfileInformation} />
      )}
    </div>
  );
}

const FETCH_PROFILE_INFORMATION = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      id
      username
      email
      createdAt
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

export default EditProfile;
