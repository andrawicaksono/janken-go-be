const { AppError } = require("../utils/error");
const { getRandomInt } = require("../utils/randomNumberGenerator");

const createOfflineGame = (gameRepository) => async (player1Id) => {
  const gameData = {
    player1Id: player1Id,
  };

  try {
    const [game, errGame] = await gameRepository.createGame(gameData);
    if (errGame) throw errGame;

    const updateData = {
      player2Id: 0,
      gameId: game.id,
    };

    const [updatedGame, errUpdatedGame] = await gameRepository.addPlayer(
      updateData
    );
    if (errUpdatedGame) throw errUpdatedGame;

    return [updatedGame, null];
  } catch (err) {
    return [null, err];
  }
};

const createOnlineGame = (gameRepository) => async (player1Id) => {
  const gameData = {
    player1Id: player1Id,
  };

  try {
    const [game, errGame] = await gameRepository.createGame(gameData);
    if (errGame) throw errGame;

    return [game, null];
  } catch (err) {
    return [null, err];
  }
};

const joinOnlineGame = (gameRepository) => async (data) => {
  try {
    const [game, errGame] = await gameRepository.findGameById(data.gameId);
    if (errGame) throw errGame;

    if (!game) throw new AppError(404, "Game not found");

    if (game.player1_id == data.player2Id)
      throw new AppError(400, "You're the host of this game");

    if (game.player2_id) throw new AppError(400, "Game is full");

    const updateData = {
      player2Id: data.player2Id,
      gameId: data.gameId,
    };

    const [updatedGame, errUpdatedGame] = await gameRepository.addPlayer(
      updateData
    );
    if (errUpdatedGame) throw errUpdatedGame;

    return [updatedGame, null];
  } catch (err) {
    return [null, err];
  }
};

const saveGameResult =
  (gameRepository, roundRepository, userRepository, db) => async (data) => {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const [game, errGame] = await gameRepository.findGameById(data.id);
      if (errGame) throw errGame;

      if (!game) throw new AppError(404, "Game not found");
      if (game.winner_id !== null) throw new AppError(400, "Game is finished");

      let rounds = [];

      for (let i = 0; i < data.roundsPlayed; i++) {
        const roundData = {
          gameId: data.id,
          roundNumber: i + 1,
          player1Choice: data.player1Choices[i]?.toLowerCase(),
          player2Choice: data.player2Choices[i]?.toLowerCase(),
          roundWinnerId: data.roundsWinnerId[i],
        };

        const [round, errRound] = await roundRepository.saveRound(
          roundData,
          client
        );
        if (errRound) throw errRound;

        rounds.push(round);
      }

      let randomScore;
      let randomXp;

      if (game.player2_id) {
        randomScore = getRandomInt(100, 150);
        randomXp = getRandomInt(150, 250);
      } else {
        randomScore = getRandomInt(50, 100);
        randomXp = getRandomInt(100, 200);
      }

      const player1Score = randomScore * data.player1Wins;
      const player2Score = randomScore * data.player2Wins;
      const player1Xp =
        randomXp * (data.player1Wins > 0 ? data.player1Wins : 1);
      const player2Xp =
        randomXp * (data.player2Wins > 0 ? data.player2Wins : 1);

      const updateData = {
        id: data.id,
        roundsPlayed: data.roundsPlayed,
        player1Wins: data.player1Wins,
        player2Wins: data.player2Wins,
        winnerId:
          data.player1Wins > data.player2Wins
            ? game.player1_id
            : game.player2_id,
        player1Score: player1Score,
        player2Score: player2Score,
        player1Xp: player1Xp,
        player2Xp: player2Xp,
      };

      const [player1, errPlayer1] = await userRepository.findUserById(
        game.player1_id
      );
      if (errPlayer1) throw errPlayer1;
      if (!player1) throw AppError(404, "User not found");

      const updatePlayer1 = {
        id: player1.id,
        score: player1Score,
        xp: player1Xp,
        isWon: data.player1Wins > data.player2Wins,
      };

      const [_, errUpdatedPlayer1] = await userRepository.updateUserStats(
        updatePlayer1,
        client
      );

      if (errUpdatedPlayer1) throw errUpdatedPlayer1;

      // Update Player 2 if isn't computer
      if (game.player2_id) {
        const [player2, errPlayer2] = await userRepository.findUserById(
          game.player2_id
        );
        if (errPlayer2) throw errPlayer2;
        if (!player2) throw AppError(404, "User not found");

        const updatePlayer2 = {
          id: player2.id,
          score: player2Score,
          xp: player2Xp,
          isWon: data.player2Wins > data.player1Wins,
        };

        const [_, errUpdatedPlayer2] = await userRepository.updateUserStats(
          updatePlayer2,
          client
        );
        if (errUpdatedPlayer2) throw errUpdatedPlayer2;
      }

      const [updatedGame, errUpdatedGame] = await gameRepository.saveGameResult(
        updateData,
        client
      );

      if (errUpdatedGame) throw errUpdatedGame;

      await client.query("COMMIT");

      return [{ ...updatedGame, rounds }, null];
    } catch (err) {
      await client.query("ROLLBACK");

      return [null, err];
    } finally {
      client.release();
    }
  };

const getAllGamesByUserId = (gameRepository) => async (userId) => {
  try {
    const [games, err] = await gameRepository.findGamesByUserId(userId);
    if (err) throw err;

    return [games, null];
  } catch (err) {
    return [null, err];
  }
};

const getUserGameDetailById = (gameRepository) => async (data) => {
  try {
    const [game, err] = await gameRepository.findUserGameDetailById(data);
    if (err) throw err;

    if (!game) throw new AppError(404, "Game not found");

    return [game, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (gameRepository, roundRepository, userRepository, db) => {
  return {
    createOfflineGame: createOfflineGame(gameRepository),
    createOnlineGame: createOnlineGame(gameRepository),
    joinOnlineGame: joinOnlineGame(gameRepository),
    saveGameResult: saveGameResult(
      gameRepository,
      roundRepository,
      userRepository,
      db
    ),
    getAllGamesByUserId: getAllGamesByUserId(gameRepository),
    getUserGameDetailById: getUserGameDetailById(gameRepository),
  };
};
