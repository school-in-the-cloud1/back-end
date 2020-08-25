const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("./users/usersRouter.js");
const tasksRouter = require("./tasks/tasksRouter.js");
const sessionsRouter = require("./sessions/sessionsRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/tasks", tasksRouter);
server.use("/api/sessions", sessionsRouter);

//Test API
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;