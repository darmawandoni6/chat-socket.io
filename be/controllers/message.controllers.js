const createError = require("http-errors");
const response = require("../helpers/response");
const messageService = require("../services/message.service");

module.exports = {
  getMessage: async (req, res, next) => {
    try {
      const { roomMemberId } = req.params;

      const { data, error } = await messageService.findAll({ roomMemberId });
      if (error) throw createError.BadRequest(error);

      response({ res, status: 200, message: "success", data });
    } catch (error) {
      next(error);
    }
  },
};
