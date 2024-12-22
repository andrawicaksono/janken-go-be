const register = (data) => {
  return {
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    avatar_url: data.avatar_url,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};

const login = (data) => {
  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      avatar_url: data.user.avatar_url,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at,
    },
    token: data.token,
  };
};

module.exports = {
  register,
  login,
};
