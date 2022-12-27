const Sequelize = require("sequelize");
const db = require("../configs/config.db");

const { DataTypes } = Sequelize;

const Rooms = db.define(
  "rooms",
  {
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Rooms;
