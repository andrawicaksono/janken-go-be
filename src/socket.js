const Socket = (io) => {
  const rooms = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("createRoom", (roomId) => {
      if (!rooms[roomId]) {
        rooms[roomId] = {
          players: [],
          moves: {},
          scores: { player1: 0, player2: 0 },
        };
        socket.join(roomId);
        rooms[roomId].players.push(socket.id);
        socket.emit("roomCreated", roomId);
        console.log("Room created:", roomId);
      }
    });

    // Handle joining a room
    socket.on("joinRoom", (roomId) => {
      if (rooms[roomId] && rooms[roomId].players.length < 2) {
        socket.join(roomId);
        rooms[roomId].players.push(socket.id);
        io.to(roomId).emit("playerJoined", rooms[roomId].players);
      } else {
        socket.emit("error", "Room is full or does not exist.");
      }
    });

    // Handle player move
    socket.on("playerMove", ({ roomId, move }) => {
      const room = rooms[roomId];
      if (room) {
        room.moves[socket.id] = move;

        if (Object.keys(room.moves).length === 2) {
          const [player1, player2] = room.players;
          const result = determineWinner(
            room.moves[player1],
            room.moves[player2]
          );

          if (result === "player1") room.scores.player1++;
          else if (result === "player2") room.scores.player2++;

          io.to(roomId).emit("roundResult", {
            moves: room.moves,
            result,
            scores: room.scores,
          });

          room.moves = {};
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const roomId in rooms) {
        const room = rooms[roomId];
        room.players = room.players.filter((player) => player !== socket.id);
        if (room.players.length === 0) delete rooms[roomId];
      }
    });
  });

  function determineWinner(move1, move2) {
    const rules = { Rock: "Scissor", Scissor: "Paper", Paper: "Rock" };
    if (move1 === move2) return "draw";
    return rules[move1] === move2 ? "player1" : "player2";
  }
};

module.exports = Socket;
