const express = require("express");
const router = express.Router();
const { leaderboardController, authMiddleware } = require("../container");

router.get(
  "/",
  authMiddleware.verifyToken,
  leaderboardController.getLeaderboard
);

module.exports = router;
