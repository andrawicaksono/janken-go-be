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

const saveGameResult = () => async (data, client) => {
  const query = `UPDATE games SET rounds_played = $1, player1_wins = $2, player2_wins = $3, winner_id = $4, player1_score = $5, player2_score = $6, player1_xp = $7, player2_xp = $8, updated_at = NOW() WHERE id = $9 RETURNING *`;

  try {
    const result = await client.query(query, [
      data.roundsPlayed,
      data.player1Wins,
      data.player2Wins,
      data.winnerId,
      data.player1Score,
      data.player2Score,
      data.player1Xp,
      data.player2Xp,
      data.id,
    ]);

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
    saveGameResult: saveGameResult(),
  };
};
