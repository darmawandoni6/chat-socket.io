const jwt = require("../middlewares/jwt");
var authRouter = require("./auth");
var roomsRouter = require("./rooms");
var messageRouter = require("./message");

const v1 = "/api-v1";
module.exports = (app) => {
  app.get("/", async (req, res, next) => {
    try {
      res.send("Welcome to Message App");
    } catch (error) {
      next(error);
    }
  });
  app.use(v1 + "/auth", authRouter);
  app.use(v1, jwt.verifyAccessToken, roomsRouter);
  app.use(v1, jwt.verifyAccessToken, messageRouter);
};
