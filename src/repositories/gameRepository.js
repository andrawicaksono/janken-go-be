const createGame = (db) => async (data) => {
  const query = `INSERT INTO games (room_code, player1_id) VALUES ($1, $2) RETURNING *`;

  try {
    const result = await db.query(query, [data.roomCode, data.player1Id]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

const addPlayer = (db) => async (data) => {
  const query = `UPDATE games SET player2_id = $1, updated_at = NOW() WHERE id = $2 RETURNING *`;

  try {
    const result = await db.query(query, [data.player2Id, data.gameId]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (db) => {
  return {
    createGame: createGame(db),
    addPlayer: addPlayer(db),
  };
};
