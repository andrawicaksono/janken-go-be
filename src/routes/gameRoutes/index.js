const express = require("express");
const router = express.Router();

const gameRoutes = require("./gameRoutes");

router.use("/", gameRoutes);

module.exports = router;
