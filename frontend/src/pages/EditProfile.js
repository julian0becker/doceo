import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import ProfileDetails from "../components/ProfileDetails";
import { Button } from "semantic-ui-react";
import EditProfileForm from "../components/EditProfileForm";

import gql from "graphql-tag";

function EditProfile() {
  const { user } = useContext(AuthContext);

  const { data, error, loading } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });
  console.log(data);

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ProfileDetails info={data.getProfileInformation} />
      )}
      <Button secondary>Edit Profile</Button>
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
