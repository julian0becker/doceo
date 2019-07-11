const checkAuth = require("../../util/check-auth");
const User = require("../../models/User");

module.exports = {
  Query: {
    async findFriendByUsername(_, { username }, context) {
      checkAuth(context);
      if (username.trim() === "") {
        throw new Error("Search must not be empty");
      }
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async addOneFriend(_, { friendId }, context) {
      const { id } = checkAuth(context);

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            friends: friendId
          }
        },
        { new: true }
      ).populate("friends");
      return updatedUser;
    }
  }
};
