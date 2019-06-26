import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth-context";
import ProfileDetails from "../components/ProfileDetails";
import { Button } from "semantic-ui-react";
import EditProfileForm from "../components/EditProfileForm";

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading, data } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  let info;
  if (!loading) {
    info = data.getProfileInformation;
  }

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <React.Fragment>
          <React.Fragment>
            <ProfileDetails info={info} />
            <Button secondary onClick={handleClick}>
              Edit Profile
            </Button>
          </React.Fragment>
          {isFormOpen && <EditProfileForm />}
        </React.Fragment>
      )}
    </div>
  );
}

const FETCH_PROFILE_INFORMATION = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      username
      email
      createdAt
      languages {
        speaking
        learning
      }
    }
  }
`;
export default EditProfile;
