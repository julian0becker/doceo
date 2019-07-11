const checkAuth = require("../../util/check-auth");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getProfileInformation(_, { userId }, context) {
      checkAuth(context);
      try {
        const user = await User.findOne({ _id: userId })
          .populate("friends")
          .exec();
        return user;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async updateSpeaking(_, { speaking }, context) {
      const { id } = checkAuth(context);
      const updatedSpeaking = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "languages.speaking": speaking
          }
        },
        { new: true }
      );

      return updatedSpeaking;
    },
    async updateLearning(_, { learning }, context) {
      const { id } = checkAuth(context);
      const updatedLearning = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "languages.learning": learning
          }
        },
        { new: true }
      );

      return updatedLearning;
    },
    async updateEmail(_, { email }, context) {
      const { id } = checkAuth(context);
      const updatedEmail = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            email: email
          }
        },
        { new: true }
      );

      return updatedEmail;
    }
  }
};
