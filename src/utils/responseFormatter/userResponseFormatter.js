const user = (data) => {
  return {
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    avatar_url: data.avatar_url,
    score: data.score,
    xp: data.xp,
    games_played: data.games_played,
    games_won: data.games_won,
    games_lost: data.games_lost,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

module.exports = {
  user,
};
