const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//Test API
server.get("/api", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;