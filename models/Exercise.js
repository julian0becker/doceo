const { model, Schema } = require("mongoose");

const exerciseSchema = new Schema({
  subject: String,
  description: String,
  username: String,
  recipients: [{ recipientId: { type: Schema.Types.ObjectId, ref: "User" } }],
  sentences: [{ sentence: String, translation: String }],
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Exercise", exerciseSchema);
