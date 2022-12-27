const createError = require("http-errors");
const response = require("../helpers/response");
const roomsService = require("../services/rooms.service");
const { Op } = require("sequelize");

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { id } = req.payload;
      let r = { data: null, error: null };
      r = await roomsService.findAll(
        { userId: id },
        { userId: { [Op.ne]: id } }
      );
      if (r.error) throw createError.BadRequest(r.error);

      response({
        res,
        status: 200,
        message: "success create room",
        data: r.data,
      });
    } catch (error) {
      next(error);
    }
  },
  createRoom: async (req, res, next) => {
    try {
      const { id } = req.body;
      const { id: userId } = req.payload;

      const payload = [userId, id];

      let r = { data: null, error: null };

      r = await roomsService.findOne({ userId }, { userId: id });
      if (r.data) {
        response({
          res,
          status: 200,
          message: "open room",
          data: r.data,
        });
        return;
      }
      if (r.error) throw createError.BadRequest(r.error);
      r = await roomsService.createBulk(payload);
      if (r.error) throw createError.BadRequest(r.error);
      response({
        res,
        status: 200,
        message: "success create room",
        data: r.data,
      });
    } catch (error) {
      next(error);
    }
  },
};
