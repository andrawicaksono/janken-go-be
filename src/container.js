const config = require("./config");

// Repositories
const PlayerRepository = require("./repositories/playerRepository");
const UserRepository = require("./repositories/userRepository");

// Services
const PlayerService = require("./services/playerService");
const AuthService = require("./services/authService");

// Controllers
const PlayerController = require("./controllers/playerController");
const AuthController = require("./controllers/authController");
const CheckController = require("./controllers/checkController");

// Middlewares
const AuthMiddleware = require("./middlewares/authMiddleware");
const authMiddleware = AuthMiddleware(config.firebase.admin);

// Check
const checkController = CheckController();

// Player
const playerRepository = PlayerRepository(
  config.firebase.firestore,
  config.firebase.db
);
const playerService = PlayerService(playerRepository);
const playerController = PlayerController(playerService);

// Auth
const userRepository = UserRepository(
  config.firebase.fireauth,
  config.firebase.auth
);
const authService = AuthService(userRepository, playerRepository);
const authController = AuthController(authService);

module.exports = {
  checkController,
  authController,
  playerController,
  authMiddleware,
};
