import gql from "graphql-tag";

export const FETCH_PROFILE_INFORMATION = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      username
      email(always: true)
      createdAt
      languages {
        speaking
        learning
      }
    }
  }
`;
