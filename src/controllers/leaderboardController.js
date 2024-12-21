const getLeaderboards = (leaderboardService) => async (req, res, next) => {
  const { limit } = req.query;
  const user = req.user;

  try {
    const [leaderboards, err] = await leaderboardService.getLeaderboards(
      user.uid,
      limit
    );
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get leaderboard success",
      data: leaderboards,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (leaderboardService) => {
  return {
    getLeaderboards: getLeaderboards(leaderboardService),
  };
};
