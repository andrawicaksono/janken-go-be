const { AppError } = require("../utils/error");

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

module.exports = (gameRepository) => {
  return {
    createOfflineGame: createOfflineGame(gameRepository),
    createOnlineGame: createOnlineGame(gameRepository),
    joinOnlineGame: joinOnlineGame(gameRepository),
  };
};
