const express = require("express");
const router = express.Router();
const { playerController, authMiddleware } = require("../container");

router.get(
  "/current",
  authMiddleware.verifyToken,
  playerController.getCurrentPlayer
);

router.put(
  "/nickname",
  authMiddleware.verifyToken,
  playerController.updateNickname
);

module.exports = router;
