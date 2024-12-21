const express = require("express");
const router = express.Router();
const { leaderboardController, authMiddleware } = require("../container");

router.get(
  "/",
  authMiddleware.verifyToken,
  leaderboardController.getLeaderboards
);

module.exports = router;
