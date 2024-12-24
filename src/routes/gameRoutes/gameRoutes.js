const express = require("express");
const router = express.Router();
const { gameController, authMiddleware } = require("../../container");

router.post(
  "/create/offline",
  authMiddleware.verifyToken,
  gameController.createOfflineGame
);

router.post(
  "/create/online",
  authMiddleware.verifyToken,
  gameController.createOnlineGame
);

module.exports = router;
