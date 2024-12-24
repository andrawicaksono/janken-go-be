const { generateRoomCode } = require("../utils/roomCodeGenerator");

const createOfflineGame = (gameRepository) => async (player1Id) => {
  const gameData = {
    roomCode: generateRoomCode(6),
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
    roomCode: generateRoomCode(6),
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

module.exports = (gameRepository) => {
  return {
    createOfflineGame: createOfflineGame(gameRepository),
    createOnlineGame: createOnlineGame(gameRepository),
  };
};
