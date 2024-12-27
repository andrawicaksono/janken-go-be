const { gameService } = require("./container");

const Socket = (io) => {
  const rooms = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("createRoom", async (data) => {
      if (!rooms[data.roomCode]) {
        const [gameData, _] = await gameService.createOnlineGame(data.userId);

        rooms[data.roomCode] = {
          id: gameData.id,
          p1: {
            id: data.userId,
            nickname: data.userNickname,
            avatar: data.userAvatar,
          },
          p2: null,
          roundsPlayed: 0,
          p1Score: 0,
          p2Score: 0,
          p1Choices: [],
          p2Choices: [],
          roundWinners: [],
        };
        socket.join(data.roomCode);
        console.log("Room created:", data.roomCode);
      } else {
        socket.emit("roomAlreadyExists");
      }
    });

    socket.on("joinRoom", async (data) => {
      if (rooms[data.roomCode] && !rooms[data.roomCode].p2) {
        if (rooms[data.roomCode].p1.id === data.userId) {
          return;
        }

        rooms[data.roomCode].p2 = {
          id: data.userId,
          nickname: data.userNickname,
          avatar: data.userAvatar,
        };
        socket.join(data.roomCode);
        const room = rooms[data.roomCode];
        const joinData = {
          gameId: room.id,
          player2Id: room.p2.id,
        };

        await gameService.joinOnlineGame(joinData);
        io.to(data.roomCode).emit("playerJoined", rooms[data.roomCode]);
      } else {
        socket.emit("errorRoom", "Room is full or does not exist.");
      }
    });

    socket.on("playerMove", (data) => {
      const room = rooms[data.roomCode];
      if (room) {
        if (data.isHost) {
          room.p1Choices = [...room.p1Choices, data.choice];
        } else {
          room.p2Choices = [...room.p2Choices, data.choice];
        }

        const p1Moves = room.p1Choices.length;
        const p2Moves = room.p2Choices.length;

        if (p1Moves === p2Moves) {
          room.roundsPlayed += 1;
          const p1Choice = room.p1Choices[p1Moves - 1];
          const p2Choice = room.p2Choices[p2Moves - 1];
          const result = determineWinner(p1Choice, p2Choice, room);

          let gameWinner;

          if (result === "player1") {
            room.roundWinners = [...room.roundWinners, room.p1.id];
            room.p1Score += 1;
            if (room.p1Score >= 3) gameWinner = "player1";
          } else if (result === "player2") {
            room.roundWinners = [...room.roundWinners, room.p2.id];
            room.p2Score += 1;
            if (room.p2Score >= 3) gameWinner = "player2";
          } else {
            room.roundWinners = [...room.roundWinners, null];
          }

          io.to(data.roomCode).emit("roundResult", {
            result: result,
            gameData: room,
            p1Choice: p1Choice,
            p2Choice: p2Choice,
          });

          if (gameWinner) {
            const saveData = {
              id: room.id,
              roundsPlayed: room.roundsPlayed,
              player1Choices: room.p1Choices,
              player2Choices: room.p2Choices,
              roundsWinnerId: room.roundWinners,
              player1Wins: room.p1Score,
              player2Wins: room.p2Score,
            };

            gameService
              .saveGameResult(saveData)
              .then((gameData) => {
                io.to(data.roomCode).emit("gameOver", {
                  gameWinner: gameWinner,
                  gameData: gameData[0],
                });
              })
              .catch((err) => console.error(err));
          }
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const roomCode in rooms) {
        io.to(roomCode).emit("gameUnfinished");
        delete rooms[roomCode];
      }
    });
  });

  const determineWinner = (move1, move2) => {
    const rules = { r: "s", s: "p", p: "r" };
    if (move1 === move2) return "draw";
    if (move1 === null) return "player2";
    if (move2 === null) return "player1";
    return rules[move1] === move2 ? "player1" : "player2";
  };
};

module.exports = Socket;
