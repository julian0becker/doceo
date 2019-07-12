const { model, Schema } = require("mongoose");

const requestSchema = new Schema({
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  subject: String,
  description: String,
  recipients: [{ recipientId: { type: Schema.Types.ObjectId, ref: "User" } }],
  createdAt: String,
  language: String
});

module.exports = model("Request", requestSchema);
