const checkAuth = require("../../util/check-auth");
const Exercise = require("../../models/Exercise");

module.exports = {
  Query: {
    async getExercises(_, { recipientId }, context) {
      checkAuth(context);
      try {
        const exercise = await Exercise.find({
          recipients: { $elemMatch: { recipientId } }
        }).sort({ createdAt: -1 });
        return exercise;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createExercise(
      _,
      { subject, description, sentences, recipients },
      context
    ) {
      const { id, username } = checkAuth(context);

      if (subject.trim() === "") {
        throw new Error("Exercise body must not be empty");
      }

      const newExercise = new Exercise({
        user: id,
        username,
        subject,
        description,
        sentences,
        recipients,
        createdAt: new Date().toISOString()
      });

      const exercise = await newExercise.save();
      return exercise;
    }
  }
};
