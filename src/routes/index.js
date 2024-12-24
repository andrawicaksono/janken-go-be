const express = require("express");
const router = express.Router();

const checkRoutes = require("./checkRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const leaderboardRoutes = require("./leaderboardRoutes");
const gameRoutes = require("./gameRoutes");

router.use("/check", checkRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/games", gameRoutes);

module.exports = router;
