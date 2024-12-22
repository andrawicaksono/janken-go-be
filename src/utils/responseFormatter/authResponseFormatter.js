const register = (data) => {
  const result = {
    id: data.id,
    email: data.email,
  };

  if (data.google_id) result.google_id = data.google_id;

  return result;
};

const login = (data) => {
  const user = {
    id: data.user.id,
    email: data.user.email,
  };

  if (data.user.google_id) user.google_id = data.user.google_id;

  return {
    user,
    token: data.token,
  };
};

module.exports = {
  register,
  login,
};
