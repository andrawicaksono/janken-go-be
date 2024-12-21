const getPlayerByUid = (playerRepository) => async (uid) => {
  try {
    const [player, playerErr] = await playerRepository.findPlayerByUid(uid);
    if (playerErr) throw playerErr;

    return [player, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (playerRepository) => {
  return {
    getPlayerByUid: getPlayerByUid(playerRepository),
  };
};
