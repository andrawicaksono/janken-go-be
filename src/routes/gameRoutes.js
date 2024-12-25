const express = require("express");
const router = express.Router();
const { gameController, authMiddleware } = require("../container");
const { validateInput } = require("../middlewares/inputMiddleware");
const { saveGameResultSchema } = require("../validators/gameValidator");

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

router.post(
  "/join/:id",
  authMiddleware.verifyToken,
  gameController.joinOnlineGame
);

router.post(
  "/save",
  authMiddleware.verifyToken,
  validateInput(saveGameResultSchema),
  gameController.saveGameResult
);

router.get(
  "/history",
  authMiddleware.verifyToken,
  gameController.getGamesHistory
);

router.get(
  "/history/:id",
  authMiddleware.verifyToken,
  gameController.getUserGameDetailById
);

module.exports = router;
