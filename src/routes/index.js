const express = require("express");
const router = express.Router();

const checkRoutes = require("./checkRoutes");
const playerRoutes = require("./playerRoutes");
const authRoutes = require("./authRoutes");

router.use("/check", checkRoutes);
router.use("/auth", authRoutes);
router.use("/players", playerRoutes);

module.exports = router;
