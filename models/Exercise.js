const { model, Schema } = require("mongoose");

const exerciseSchema = new Schema({
  subject: String,
  description: String,
  username: String,
  recipients: [{ recipientId: { type: Schema.Types.ObjectId, ref: "users" } }],
  sentences: [{ sentence: String, translation: String }],
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Exercise", exerciseSchema);
