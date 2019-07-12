const { gql } = require("apollo-server");

module.exports = gql`
  type Exercise {
    id: ID!
    subject: String!
    description: String
    createdAt: String!
    username: String!
    sentences: [Sentence!]!
    recipients: [Recipient!]
  }
  type Recipient {
    recipientId: ID!
  }

  input RecipientInput {
    recipientId: ID!
  }

  input SentenceInput {
    sentence: String!
    translation: String!
  }

  type Sentence {
    sentence: String!
    translation: String!
  }

  type User {
    id: ID
    email: String
    token: String
    username: String
    createdAt: String
    languages: Languages
    friends: [User]
  }

  type Languages {
    speaking: [Speaking]
    learning: [Learning]
  }

  input SpeakingInput {
    value: String!
    label: String!
  }

  input LearningInput {
    value: String!
    label: String!
  }

  type Speaking {
    value: String
    label: String
  }

  type Learning {
    value: String
    label: String
  }

  type Request {
    id: ID!
    username: String!
    subject: String!
    description: String
    recipients: [Recipient!]!
    createdAt: String
    language: String
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getExercises(recipientId: ID!): [Exercise]
    getRequests(recipientId: ID!): [Request]
    getProfileInformation(userId: ID!): User!
    findFriendByUsername(username: String!): User
  }
  type Mutation {
    createExercise(
      subject: String!
      description: String
      sentences: [SentenceInput]
      recipients: [RecipientInput]
    ): Exercise!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createRequest(
      subject: String!
      description: String
      recipients: [RecipientInput!]!
      language: String!
    ): Request!
    updateSpeaking(speaking: [SpeakingInput!]!): User!
    updateLearning(learning: [LearningInput!]!): User!
    updateEmail(email: String!): User!
    addOneFriend(friendId: String!): User!
    removeFriend(friendId: String!): User!
  }
`;
