var express = require("express");
var roomsController = require("../controllers/rooms.controller");
var router = express.Router();

router.get("/room", roomsController.findAll);
router.post("/room", roomsController.createRoom);

module.exports = router;
