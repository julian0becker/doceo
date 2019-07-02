import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import ProfileDetails from "../components/ProfileDetails";
import gql from "graphql-tag";
import { UserContext } from "../context/user-context";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const { setLanguages } = useContext(UserContext);

  const { data, error, loading } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  if (!loading) {
    setLanguages(data.getProfileInformation.languages);
  }

  return (
    <div className="profile-page">
      <h1>Settings</h1>
      {loading ? (
        <h1>Loading</h1>
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
