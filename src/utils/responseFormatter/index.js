const { register, login } = require("./authResponseFormatter");
const { user } = require("./userResponseFormatter");

module.exports = {
  auth: {
    register,
    login,
  },
  user,
};
