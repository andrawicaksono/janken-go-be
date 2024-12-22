const Socket = (io) => {
  let rooms = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const roomCode in rooms) {
        if (
          rooms[roomCode].host === socket.id ||
          rooms[roomCode].guest === socket.id
        ) {
          delete rooms[roomCode];
          io.to(roomCode).emit("roomClosed");
          break;
        }
      }
    });

    socket.on("createGame", () => {
      const roomCode = generateRoomCode(6);
      rooms[roomCode] = {
        host: socket.id,
        guest: null,
        p1moves: [],
        p2moves: [],
        round: 1,
        scores: { p1: 0, p2: 0 },
        p1Wins: 0,
        p2Wins: 0,
        gameOver: false,
      };
      socket.join(roomCode);
      socket.emit("newGame", { roomCode });
    });

    socket.on("joinGame", (data) => {
      const room = rooms[data.roomCode];
      if (!room) {
        socket.emit("roomNotFound");
        return;
      }
      if (room.guest) {
        socket.emit("roomFull");
        return;
      }
      if (room.host === socket.id) {
        socket.emit("alreadyInRoom");
        return;
      }

      room.guest = socket.id;
      socket.join(data.roomCode);
      io.to(data.roomCode).emit("startGame", room);
    });

    socket.on("p1Choice", (data) => {
      const room = rooms[data.roomCode];
      if (!room || room.gameOver) {
        socket.emit("invalidRoom");
        return;
      }
      if (!isValidChoice(data.rpsValue)) {
        socket.emit("invalidChoice");
        return;
      }

      room.p1moves.push(data.rpsValue);
      checkAndDeclareWinner(data.roomCode);
    });

    socket.on("p2Choice", (data) => {
      const room = rooms[data.roomCode];
      if (!room || room.gameOver) {
        socket.emit("invalidRoom");
        return;
      }
      if (!isValidChoice(data.rpsValue)) {
        socket.emit("invalidChoice");
        return;
      }

      room.p2moves.push(data.rpsValue);
      checkAndDeclareWinner(data.roomCode);
    });

    socket.on("nextRound", (data) => {
      const room = rooms[data.roomCode];
      if (!room || room.gameOver) {
        socket.emit("invalidRoom");
        return;
      }

      room.round += 1;
      io.to(data.roomCode).emit("nextRound", room);
    });
  });

  function checkAndDeclareWinner(roomCode) {
    const room = rooms[roomCode];
    if (
      room.p1moves.length === room.round &&
      room.p2moves.length === room.round
    ) {
      const p1Choice = room.p1moves[room.round - 1];
      const p2Choice = room.p2moves[room.round - 1];
      const winner = getWinner(p1Choice, p2Choice);

      if (winner === "p1") room.p1Wins += 1;
      if (winner === "p2") room.p2Wins += 1;

      io.sockets.to(roomCode).emit("result", {
        winner,
        p1Choice,
        p2Choice,
        scores: room.scores,
        round: room.round,
        p1moves: room.p1moves,
        p2moves: room.p2moves,
        p1Wins: room.p1Wins,
        p2Wins: room.p2Wins,
      });

      if (room.p1Wins === 3) {
        room.gameOver = true;
        io.sockets.to(roomCode).emit("gameOver", { winner: "p1" });
      } else if (room.p2Wins === 3) {
        room.gameOver = true;
        io.sockets.to(roomCode).emit("gameOver", { winner: "p2" });
      }
    }
  }

  function generateRoomCode(length) {
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function isValidChoice(choice) {
    return ["Rock", "Paper", "Scissor", ""].includes(choice);
  }

  function getWinner(p1Choice, p2Choice) {
    if (p1Choice === p2Choice) return "d";
    const rules = {
      Rock: "Scissor",
      Scissor: "Paper",
      Paper: "Rock",
    };
    return rules[p1Choice] === p2Choice ? "p1" : "p2";
  }
};

module.exports = Socket;
