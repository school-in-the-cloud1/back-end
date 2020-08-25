const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("./users/usersRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

//Test API
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;