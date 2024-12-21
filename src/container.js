const config = require("./config");

// Repositories
const UserRepository = require("./repositories/userRepository");
const PlayerRepository = require("./repositories/playerRepository");

// Services
const AuthService = require("./services/authService");

// Controllers
const AuthController = require("./controllers/authController");

// Controllers
const CheckController = require("./controllers/checkController");

// Check
const checkController = CheckController();

// Auth
const userRepository = UserRepository(
  config.firebase.fireauth,
  config.firebase.auth
);
const playerRepository = PlayerRepository(
  config.firebase.firestore,
  config.firebase.db
);
const authService = AuthService(userRepository, playerRepository);
const authController = AuthController(authService);

module.exports = {
  checkController,
  authController,
};
