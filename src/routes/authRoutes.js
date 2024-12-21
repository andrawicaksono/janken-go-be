const express = require("express");
const router = express.Router();
const { authController } = require("../container");
const { validateInput } = require("../middlewares/inputHandler");
const { authSchema } = require("../validators/authValidator");

router.post(
  "/register",
  validateInput(authSchema),
  authController.registerWithEmail
);

module.exports = router;
