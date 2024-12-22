const getLeaderboard = (userRepository) => async (limit, id) => {
  try {
    const [users, usersErr] = await userRepository.findLeaderboard(limit, id);
    if (usersErr) throw usersErr;

    const userRank = users.find((user) => user.id === id).rank;

    users.return[({ leaderboard: users, user_rank: userRank }, null)];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (userRepository) => {
  return {
    getLeaderboard: getLeaderboard(userRepository),
  };
};
