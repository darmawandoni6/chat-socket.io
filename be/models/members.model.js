const db = require("../configs/config.db");

const Members = db.define("members", {}, { freezeTableName: true });

module.exports = Members;
