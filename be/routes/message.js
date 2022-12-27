var express = require("express");
const messageControllers = require("../controllers/message.controllers");
const jwt = require("../middlewares/jwt");
var router = express.Router();

router.get("/message/:roomMemberId", messageControllers.getMessage);

module.exports = router;
