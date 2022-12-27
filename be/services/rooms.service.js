const db = require("../configs/config.db");
const Members = require("../models/members.model");
const Rooms = require("../models/rooms.model");
const Users = require("../models/users.model");
const RoomMember = require("../models/roomMember.model");
const Message = require("../models/messages.model");

module.exports = {
  findAll: async (where, whereII) => {
    try {
      const data = await RoomMember.findAll({
        include: [
          {
            model: Members,
            where: whereII,
            include: [
              {
                model: Users,
                attributes: ["id", "name", "email"],
              },
            ],
          },
          {
            model: Rooms,
            attributes: [],
            where,
          },
          {
            model: Message,
            order: [["createdAt", "DESC"]],
            limit: 1,
            include: [
              {
                model: Users,
                attributes: ["id", "name", "email"],
              },
            ],
          },
        ],
      });
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  },
  createBulk: async (payload) => {
    try {
      await db.transaction(async (transaction) => {
        const data = await RoomMember.create({}, { transaction });

        payload = payload.map((id) => ({
          userId: id,
          roomMemberId: data.id,
        }));
        await Rooms.bulkCreate(payload, { transaction });
        await Members.bulkCreate(payload, { transaction });
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },
  findOne: async (where, whereII) => {
    try {
      let data = await Rooms.findOne({
        where,
        include: [
          {
            model: RoomMember,
            required: true,
            include: [
              {
                model: Members,
                where: whereII,
                attributes: [],
              },
            ],
          },
        ],
      });
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  },
};
