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

const updateNickname = (playerService) => async (req, res, next) => {
  const user = req.user;
  const { nickname } = req.body;

  const data = {
    uid: user.uid,
    nickname,
  };

  try {
    const [player, err] = await playerService.updateNickname(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Update nickname success",
      data: player,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (playerService) => {
  return {
    getCurrentPlayer: getCurrentPlayer(playerService),
    updateNickname: updateNickname(playerService),
  };
};
