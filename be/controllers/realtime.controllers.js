const express = require("express");
const createError = require("http-errors");
const response = require("../helpers/response");
const jwt = require("../middlewares/jwt");
const roomMemberService = require("../services/roomMember.service");
var router = express.Router();

module.exports = (io) => {
  router.post("/send", jwt.verifyAccessToken, async (req, res, next) => {
    try {
      const { message, roomId, code } = req.body;
      const { id, name, email } = req.payload;
      let r = { data: null, error: null };

      r = await roomMemberService.create({
        message,
        roomMemberId: roomId,
        userId: id,
      });
      if (r.error) throw createError.BadRequest(r.error);

      io.emit(`receive_message-${roomId}`, {
        ...r.data,
        code,
        user: { id, name, email },
      });
      io.emit("notif_message", { ...r.data, user: { id, name, email } });
      response({ res, status: 200, message: "success send message" });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
