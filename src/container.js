const config = require("./config");

// Repositories
const UserRepository = require("./repositories/userRepository");

// Services
const AuthService = require("./services/authService");
const UserService = require("./services/userService");
const LeaderboardService = require("./services/leaderboardService");
const TokenService = require("./services/tokenService");

// Controllers
const AuthController = require("./controllers/authController");
const UserController = require("./controllers/userController");
const CheckController = require("./controllers/checkController");
const LeaderboardController = require("./controllers/leaderboardController");

// Check
const checkController = CheckController();

// User
const userRepository = UserRepository(config.db);
const userService = UserService(userRepository);
const userController = UserController(userService);

// Token
const tokenService = TokenService(config.jwt);

// Auth
const authService = AuthService(userRepository, tokenService);
const authController = AuthController(authService);

// Leaderboard
const leaderboardService = LeaderboardService(userRepository);
const leaderboardController = LeaderboardController(leaderboardService);

// Middlewares
const AuthMiddleware = require("./middlewares/authMiddleware");
const authMiddleware = AuthMiddleware(userService, tokenService);

module.exports = {
  checkController,
  authController,
  userController,
  leaderboardController,
  authMiddleware,
};
