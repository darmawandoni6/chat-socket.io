const Messages = require("../models/messages.model");
const Users = require("../models/users.model");

module.exports = {
  findAll: async (where) => {
    try {
      const data = await Messages.findAll({
        where,
        order: [["createdAt", "ASC"]],
      });
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  },
  create: async (payload) => {
    try {
      const data = await Messages.create(payload);
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  },
};
