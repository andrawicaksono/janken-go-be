const express = require("express");
const router = express.Router();
const { checkController } = require("../container");

router.get("/", checkController.checkHealth);

module.exports = router;
