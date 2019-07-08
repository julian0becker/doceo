const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const Exercise = require("../../models/Exercise");
const Request = require("../../models/Request");
const User = require("../../models/User");

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../util/validators");
const checkAuth = require("../../util/check-auth");

const { SECRET_KEY } = require("../../config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getExercises(_, { recipientId }) {
      try {
        const exercise = await Exercise.find({
          recipients: { $elemMatch: { recipientId } }
        }).sort({ createdAt: -1 });
        return exercise;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getRequests(_, { recipientId }) {
      try {
        const request = await Request.find({
          recipients: { $elemMatch: { recipientId } }
        }).sort({ createdAt: -1 });
        return request;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProfileInformation(_, { userId }) {
      try {
        const user = await User.findOne({ _id: userId });
        return user;
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
        throw new Error("Post body must not be empty");
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
    },
    async createRequest(
      _,
      { subject, description, recipients, language },
      context
    ) {
      const { id, username } = checkAuth(context);

      // checks for empty fields

      const newRequest = new Request({
        username,
        user: id,
        subject,
        description,
        recipients,
        createdAt: new Date().toISOString(),
        language
      });

      const request = await newRequest.save();
      return request;
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken"
          }
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        languages: null
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    async updateSpeaking(_, { speaking }, context) {
      const { id } = checkAuth(context);
      // const user = await User.findOne({ __id: id });

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
