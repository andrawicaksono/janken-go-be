const express = require("express");
const router = express.Router();
const { playerController, authMiddleware } = require("../container");
const { validateInput } = require("../middlewares/inputMiddleware");
const { updateNicknameSchema } = require("../validators/playerValidator");

router.get(
  "/current",
  authMiddleware.verifyToken,
  playerController.getCurrentPlayer
);

router.put(
  "/nickname",
  validateInput(updateNicknameSchema),
  authMiddleware.verifyToken,
  playerController.updateNickname
);

module.exports = router;
