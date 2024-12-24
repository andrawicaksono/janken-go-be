const formatter = require("../utils/responseFormatter");

const createOfflineGame = (gameService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [game, err] = await gameService.createOfflineGame(user.id);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Create offline game success",
      data: game,
    });
  } catch (err) {
    next(err);
  }
};

const createOnlineGame = (gameService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [game, err] = await gameService.createOnlineGame(user.id);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Create online game success",
      data: game,
    });
  } catch (err) {
    next(err);
  }
};

const joinOnlineGame = (gameService) => async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const data = {
    gameId: id,
    player2Id: user.id,
  };

  try {
    const [game, err] = await gameService.joinOnlineGame(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Join online game success",
      data: game,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (gameService) => {
  return {
    createOfflineGame: createOfflineGame(gameService),
    createOnlineGame: createOnlineGame(gameService),
    joinOnlineGame: joinOnlineGame(gameService),
  };
};
