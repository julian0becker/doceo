const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  languages: { speaking: [String], learning: [String] }
});

module.exports = model("User", userSchema);
