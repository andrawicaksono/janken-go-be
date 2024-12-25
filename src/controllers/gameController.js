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

const saveGameResult = (gameService) => async (req, res, next) => {
  const body = req.body;

  const data = {
    id: body.id,
    roundsPlayed: body.rounds_played,
    player1Wins: body.player1_wins,
    player2Wins: body.player2_wins,
    player1Choices: body.player1_choices,
    player2Choices: body.player2_choices,
    roundsWinnerId: body.rounds_winner_id,
  };

  try {
    const [game, err] = await gameService.saveGameResult(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Save game result success",
      data: game,
    });
  } catch (err) {
    next(err);
  }
};

const getGamesHistory = (gameService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [games, err] = await gameService.getAllGamesByUserId(user.id);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get games history success",
      data: games,
    });
  } catch (err) {
    next(err);
  }
};

const getUserGameDetailById = (gameService) => async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const data = {
    userId: user.id,
    gameId: id,
  };

  try {
    const [game, err] = await gameService.getUserGameDetailById(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get user game detail id by success",
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
    saveGameResult: saveGameResult(gameService),
    getGamesHistory: getGamesHistory(gameService),
    getUserGameDetailById: getUserGameDetailById(gameService),
  };
};
