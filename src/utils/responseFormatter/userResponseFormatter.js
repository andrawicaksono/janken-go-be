const currentUser = (data) => {
  return {
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    avatar_url: data.avatar_url,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

module.exports = {
  currentUser,
};
