const db = require("../configs/config.db");
const Members = require("./members.model");
const RoomMember = require("./roomMember.model");
const Rooms = require("./rooms.model");
const Users = require("./users.model");
const Messages = require("./messages.model");

(async () => {
  try {
    await db.authenticate();
    console.log("Database Connected ....");
    console.log("alter table ----------------------------------------");
    await RoomMember.sync({ alter: true });
    await Rooms.sync({ alter: true });
    await Users.sync({ alter: true });
    await Members.sync({ alter: true });
    await Messages.sync({ alter: true });
    console.log("alter table done ----------------------------------------");
  } catch (error) {
    console.log();
    console.log(" ---------------------------");
    console.log(error.message);
    process.exit();
  }
})();
