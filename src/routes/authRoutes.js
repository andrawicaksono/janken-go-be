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

router.post("/login", validateInput(authSchema), authController.loginWithEmail);

module.exports = router;
