const getLeaderboard = (userRepository) => async (id, limit) => {
  try {
    const [users, usersErr] = await userRepository.findLeaderboard(id, limit);
    if (usersErr) throw usersErr;

    const userRank = users.find((user) => user.id === id).rank;

    return [{ leaderboard: users, user_rank: userRank }, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (userRepository) => {
  return {
    getLeaderboard: getLeaderboard(userRepository),
  };
};
