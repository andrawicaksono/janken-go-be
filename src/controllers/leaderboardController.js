const getLeaderboard = (leaderboardService) => async (req, res, next) => {
  const { limit } = req.query;
  const user = req.user;

  try {
    const [leaderboard, err] = await leaderboardService.getLeaderboard(
      user.id,
      limit
    );
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get leaderboard success",
      data: leaderboard,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (leaderboardService) => {
  return {
    getLeaderboard: getLeaderboard(leaderboardService),
  };
};
