const saveRound = () => async (data, client) => {
  const query = `INSERT INTO rounds (game_id, round_number, player1_choice, player2_choice, winner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await client.query(query, [
      data.gameId,
      data.roundNumber,
      data.player1Choice,
      data.player2Choice,
      data.roundWinnerId,
    ]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = () => {
  return {
    saveRound: saveRound(),
  };
};
