const jwt = require("jsonwebtoken");

const verify = (jwtConfig) => (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

const sign = (jwtConfig) => (data) => {
  return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

module.exports = (jwtConfig) => {
  return {
    verify: verify(jwtConfig),
    sign: sign(jwtConfig),
  };
};
