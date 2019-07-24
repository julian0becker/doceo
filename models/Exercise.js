const { model, Schema } = require("mongoose");

const exerciseSchema = new Schema({
  subject: String,
  description: String,
  username: String,
  recipients: [{ recipientId: { type: Schema.Types.ObjectId, ref: "User" } }],
  sentences: [{ sentence: String, translation: String }],
  dialogue: {
    meta: [{ position: String, word: String, index: String }],
    dialogue: [{ sentence: String, speaker: String, line: Number }]
  },
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Exercise", exerciseSchema);
