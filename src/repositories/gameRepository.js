const createGame = (db) => async (data) => {
  const query = `INSERT INTO games (player1_id) VALUES ($1) RETURNING *`;

  try {
    const result = await db.query(query, [data.player1Id]);

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

const findGameById = (db) => async (id) => {
  const query = "SELECT * FROM games WHERE id = $1";

  try {
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) return [null, null];

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (db) => {
  return {
    createGame: createGame(db),
    addPlayer: addPlayer(db),
    findGameById: findGameById(db),
  };
};
