const { DataTypes } = require("sequelize");
const db = require("../configs/config.db");

const RoomsUsers = db.define(
  "roomsUsers",
  {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);

module.exports = RoomsUsers;
