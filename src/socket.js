const Socket = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Listen for incoming messages from clients
    socket.on("message", (data) => {
      console.log("Received message:", data);
      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = Socket;
