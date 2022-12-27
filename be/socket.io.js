const { Server } = require("socket.io");
module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.URL_FRONT,
      methods: ["GET", "POST"],
    },
  });
  const messageSocket = require("./controllers/realtime.controllers")(io);
  require("./routes/realtime")(messageSocket);

  const online = [];
  io.on("connection", (socket) => {
    socket.on("user_connect", (item) => {
      const find = online.find(({ id }) => id === item.id);
      if (!find) {
        online.push({ ...item, socketId: socket.id });
        io.emit("online", online);
      }
    });
    socket.on("disconnect", () => {
      const idx = online.findIndex((item) => item.socketId === socket.id);
      if (idx >= 0) {
        online.splice(idx, 1);
        io.emit("online", online);
        console.log("user disconnected", socket.id);
      }
    });
  });
};
