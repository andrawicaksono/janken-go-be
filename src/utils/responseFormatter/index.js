const { register, login } = require("./authResponseFormatter");
const { currentUser } = require("./userResponseFormatter");

module.exports = {
  auth: {
    register,
    login,
  },
  user: {
    currentUser,
  },
};
