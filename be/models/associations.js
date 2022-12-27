const Rooms = require("./rooms.model");
const Users = require("./users.model");
const Members = require("./members.model");
const RoomMember = require("./roomMember.model");
const Messages = require("./messages.model");

Users.hasMany(Rooms);
Users.hasMany(Members);
Users.hasOne(Messages);

RoomMember.hasMany(Rooms);
RoomMember.hasMany(Members);
RoomMember.hasMany(Messages);

Rooms.belongsTo(RoomMember);
Rooms.belongsTo(Users);

Members.belongsTo(Users);
Members.belongsTo(RoomMember);

Messages.belongsTo(Users);
