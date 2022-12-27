const db = require("../configs/config.db");

const RoomMember = db.define("roomMembers", {}, { freezeTableName: true });

module.exports = RoomMember;
