require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const Socket = require("./socket");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.use(errorHandler);

Socket(io);

module.exports = { server, port: config.port, io };
