const express = require("express");
const router = express.Router();
const { userController, authMiddleware } = require("../container");
const { validateInput } = require("../middlewares/inputMiddleware");
const { updateUserSchema } = require("../validators/userValidator");

router.get(
  "/current",
  authMiddleware.verifyToken,
  userController.getCurrentUser
);

router.put(
  "/",
  validateInput(updateUserSchema),
  authMiddleware.verifyToken,
  userController.updateUser
);

module.exports = router;
