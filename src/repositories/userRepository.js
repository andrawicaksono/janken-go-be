const findUserById = (db) => async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";

  try {
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) return [null, null];

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

const findUserByEmail = (db) => async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  try {
    const result = await db.query(query, [email]);

    if (result.rowCount === 0) return [null, null];

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

const findLeaderboard = (db) => async (limit, id) => {
  const query = `WITH RankedUsers AS (
        SELECT id, nickname, avatar_url, xp, score, games_played, games_won, games_lost ROW_NUMBER() OVER (ORDER BY score DESC) AS rank FROM users
      )
        SELECT * FROM RankedUsers WHERE rank <= $1 OR id = $2`;

  try {
    const result = await db.query(query, [limit, id]);

    if (result.rowCount === 0) return [null, null];

    return [result.rows, null];
  } catch (err) {
    return [null, err];
  }
};

const createUser = (db) => async (data) => {
  const query = `INSERT INTO users (email, ${
    data.googleId ? "google_id" : "password"
  }, nickname, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const result = await db.query(query, [
      data.email,
      data.googleId ? data.googleId : data.password,
      data.nickname,
      data.avatar_url,
    ]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

const updateUser = (db) => async (data) => {
  const query =
    "UPDATE users SET nickname = $1, avatar_url = $2, updated_at = NOW() WHERE id = $3 RETURNING *";

  try {
    const result = await db.query(query, [
      data.nickname,
      data.avatar_url,
      data.id,
    ]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

const deleteUser = (db) => async (id) => {
  const query = "UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *";

  try {
    const result = await db.query(query, [id]);

    return [result.rows[0], null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (db) => {
  return {
    findUserById: findUserById(db),
    findUserByEmail: findUserByEmail(db),
    findLeaderboard: findLeaderboard(db),
    createUser: createUser(db),
    updateUser: updateUser(db),
    deleteUser: deleteUser(db),
  };
};
