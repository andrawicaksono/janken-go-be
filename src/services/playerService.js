const getPlayerByUid = (playerRepository) => async (uid) => {
  try {
    const [player, playerErr] = await playerRepository.findPlayerByUid(uid);
    if (playerErr) throw playerErr;

    return [player.data(), null];
  } catch (err) {
    return [null, err];
  }
};

const updateNickname = (playerRepository) => async (data) => {
  try {
    const [player, errPlayer] = await playerRepository.findPlayerByUid(
      data.uid
    );

    if (errPlayer) throw errPlayer;

    const playerData = player.data();

    const updateData = {
      ...playerData,
      nickname: data.nickname,
      updated_at: new Date().toISOString(),
    };

    const [updatedPlayer, errUpdate] = await playerRepository.updatePlayer(
      player,
      updateData
    );

    if (errUpdate) throw errUpdate;

    return [updatedPlayer, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (playerRepository) => {
  return {
    getPlayerByUid: getPlayerByUid(playerRepository),
    updateNickname: updateNickname(playerRepository),
  };
};
