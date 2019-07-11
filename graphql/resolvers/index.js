const userResolvers = require("../resolvers/users");
const settingsResolvers = require("../resolvers/settings");
const friendsResolvers = require("../resolvers/friends");
const exerciseResolvers = require("../resolvers/exercises");
const requestResolvers = require("../resolvers/requests");

module.exports = {
  Query: {
    ...settingsResolvers.Query,
    ...friendsResolvers.Query,
    ...exerciseResolvers.Query,
    ...requestResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...settingsResolvers.Mutation,
    ...friendsResolvers.Mutation,
    ...exerciseResolvers.Mutation,
    ...requestResolvers.Mutation
  }
};
