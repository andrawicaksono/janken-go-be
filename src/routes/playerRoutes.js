const express = require("express");
const router = express.Router();
const { playerController, authMiddleware } = require("../container");

router.get(
  "/current",
  authMiddleware.verifyToken,
  playerController.getCurrentPlayer
);

module.exports = router;
