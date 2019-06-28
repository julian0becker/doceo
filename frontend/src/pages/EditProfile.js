import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth-context";
import ProfileDetails from "../components/ProfileDetails";
import { Button } from "semantic-ui-react";
import EditProfileForm from "../components/EditProfileForm";

import gql from "graphql-tag";

function EditProfile() {
  const { user } = useContext(AuthContext);

  const { data, error: err, loading } = useQuery(FETCH_PROFILE_INFORMATION, {
    variables: { name: user.id }
  });

  const [updatingProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: {
      email: "lammm@updated.com",
      speaking: ["last", "lastlast"],
      learning: ["last", "rom"]
    }
  });

  function createCallback() {
    updatingProfile();
  }

  return (
    <div className="profile-page">
      <h1>Settings</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ProfileDetails info={data.getProfileInformation} />
      )}
      <Button onClick={createCallback} secondary>
        Edit Profile
      </Button>
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
        speaking
        learning
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation($email: String!, $speaking: [String!]!, $learning: [String!]!) {
    updateProfile(
      email: $email
      languageInput: { speaking: $speaking, learning: $learning }
    ) {
      id
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
