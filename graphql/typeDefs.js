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
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getExercises(recipientId: ID!): [Exercise]
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
  }
`;
