const express = require("express");
const router = express.Router();

const checkRoutes = require("./checkRoutes");

router.use("/check", checkRoutes);

module.exports = router;
