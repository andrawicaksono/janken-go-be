const user = (data) => {
  return {
    uid: data.uid,
    email: data.email,
    token: {
      refresh_token: data.stsTokenManager.refreshToken,
      access_token: data.stsTokenManager.accessToken,
      expiration_time: new Date(
        data.stsTokenManager.expirationTime
      ).toISOString(),
    },
    created_at: new Date(parseInt(data.metadata.createdAt)).toISOString(),
  };
};

module.exports = {
  user,
};
