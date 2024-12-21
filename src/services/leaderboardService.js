const getLeaderboards = (playerRepository) => async (uid, limit) => {
  try {
    const [players, playersErr] = await playerRepository.findPlayers();
    if (playersErr) throw playersErr;

    const leaderboards = players.slice(0, limit);

    const playerRank = players.findIndex((player) => player.uid === uid) + 1;

    return [{ leaderboards, player_rank: playerRank }, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (playerRepository) => {
  return {
    getLeaderboards: getLeaderboards(playerRepository),
  };
};
