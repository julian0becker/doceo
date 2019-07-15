const Request = require("../../models/Request");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getRequests(_, { recipientId, isRequestClosed }, context) {
      checkAuth(context);
      try {
        const request = await Request.find({
          recipients: { $elemMatch: { recipientId, isRequestClosed } }
        }).sort({ createdAt: -1 });
        return request;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createRequest(
      _,
      { subject, description, recipients, language },
      context
    ) {
      const { id, username } = checkAuth(context);

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
    async closeRequest(_, { requestId }, context) {
      const { id } = checkAuth(context);

      const updatedRequest = await Request.findOneAndUpdate(
        {
          _id: requestId,
          recipients: {
            $elemMatch: {
              recipientId: id
            }
          }
        },
        {
          $set: {
            "recipients.$.isRequestClosed": true
          }
        }
      );
      return updatedRequest;
    }
  }
};
