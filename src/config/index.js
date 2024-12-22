require("dotenv").config();
const firebase = require("./firebase");

const port = parseInt(process.env.APP_PORT);

module.exports = {
  port,
  firebase,
};
