const Messages = require("../models/messages.model");

module.exports = {
  create: async (payload) => {
    try {
      const data = await Messages.create(payload);
      return { data: data.toJSON() };
    } catch (error) {
      return { error: error.message };
    }
  },
};
