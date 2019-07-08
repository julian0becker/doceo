import gql from "graphql-tag";

export const FETCH_PROFILE_INFORMATION_MODAL = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      id
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

export const FETCH_PROFILE_INFORMATION_MODAL_EMAIL = gql`
  query($name: ID!) {
    getProfileInformation(userId: $name) {
      id
      email
    }
  }
`;

export const UPDATE_LEARNING = gql`
  mutation($learning: [LearningInput!]!) {
    updateLearning(learning: $learning) {
      languages {
        learning {
          value
          label
        }
      }
    }
  }
`;

export const UPDATE_SPEAKING = gql`
  mutation($speaking: [SpeakingInput!]!) {
    updateSpeaking(speaking: $speaking) {
      languages {
        speaking {
          value
          label
        }
      }
    }
  }
`;
