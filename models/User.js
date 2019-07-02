const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  languages: {
    speaking: [{ value: String, label: String }],
    learning: [{ value: String, label: String }]
  }
});

module.exports = model("User", userSchema);
