const express = require("express");
const router = express.Router();

const checkRoutes = require("./checkRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const leaderboardRoutes = require("./leaderboardRoutes");

router.use("/check", checkRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/leaderboard", leaderboardRoutes);

module.exports = router;
