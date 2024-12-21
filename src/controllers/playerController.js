const getCurrentPlayer = (playerService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [player, err] = await playerService.getPlayerByUid(user.uid);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get current player success",
      data: player,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (playerService) => {
  return {
    getCurrentPlayer: getCurrentPlayer(playerService),
  };
};
