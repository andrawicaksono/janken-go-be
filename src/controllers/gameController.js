const formatter = require("../utils/responseFormatter");

const createOfflineGame = (gameService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [game, err] = await gameService.createOfflineGame(user.id);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Create game success",
      data: game,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (gameService) => {
  return {
    createOfflineGame: createOfflineGame(gameService),
  };
};
