const express = require("express");
const router = express.Router();
const { gameController, authMiddleware } = require("../../container");

router.post(
  "/create/offline",
  authMiddleware.verifyToken,
  gameController.createOfflineGame
);

module.exports = router;
