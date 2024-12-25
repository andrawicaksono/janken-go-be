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

const findGamesByUserId = (db) => async (userId) => {
  const query = `SELECT * FROM games WHERE (player1_id = $1 OR player2_id = $1) AND deleted_at IS NULL AND player2_id IS NOT NULL`;

  try {
    const result = await db.query(query, [userId]);

    if (result.rowCount === 0) return [null, null];

    return [result.rows, null];
  } catch (err) {
    return [null, err];
  }
};

const findUserGameDetailById = (db) => async (data) => {
  const query = `
    SELECT 
      g.id AS game_id,
      g.player1_id,
      u1.nickname AS player1_nickname,
      u1.avatar_url AS player1_avatar_url,
      g.player2_id,
      u2.nickname AS player2_nickname,
      u2.avatar_url AS player2_avatar_url,
      g.rounds_played,
      g.player1_wins,
      g.player2_wins,
      g.winner_id,
      uw.nickname AS winner_nickname,
      g.player1_score,
      g.player2_score,
      g.player1_xp,
      g.player2_xp,
      g.created_at AS game_created_at,
      g.updated_at AS game_updated_at,
    COALESCE(json_agg(
        json_build_object(
            'round_id', r.id,
            'round_number', r.round_number,
            'player1_choice', r.player1_choice,
            'player2_choice', r.player2_choice,
            'winner_id', r.winner_id,
            'round_winner_nickname', uwr.nickname,
            'round_winner_avatar_url', uwr.avatar_url,
            'created_at', r.created_at
        ) ORDER BY r.round_number
    ) FILTER (WHERE r.id IS NOT NULL), '[]') AS rounds
    FROM 
        games g
    LEFT JOIN 
        users u1 ON g.player1_id = u1.id
    LEFT JOIN 
        users u2 ON g.player2_id = u2.id
    LEFT JOIN 
        users uw ON g.winner_id = uw.id
    LEFT JOIN 
        rounds r ON g.id = r.game_id
    LEFT JOIN 
        users uwr ON r.winner_id = uwr.id
    WHERE 
        g.id = $1
        AND (g.player1_id = $2 OR g.player2_id = $2)
        AND g.deleted_at IS NULL
        AND g.player2_id IS NOT NULL
    GROUP BY 
        g.id, u1.nickname, u2.nickname, uw.nickname, u1.avatar_url, u2.avatar_url, uw.avatar_url`;

  try {
    const result = await db.query(query, [data.gameId, data.userId]);

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
    saveGameResult: saveGameResult(),
    findGamesByUserId: findGamesByUserId(db),
    findUserGameDetailById: findUserGameDetailById(db),
  };
};
