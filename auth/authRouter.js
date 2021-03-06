const bcryptjs = require("bcryptjs");
const jwt= require("jsonwebtoken")
const router = require("express").Router();

const Users = require("../api/users/usersModel.js");
const { isValid } = require("../api/users/usersService.js");
const constants = require('../config/constants.js');

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.register(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.filterUsersBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = signToken(user);
          res.status(200).json( {id: user.id, role: user.role, token: token});
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password should be alphanumeric",
    });
  }
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  }

  const secret = constants.jwtSecret;

  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload,secret,options)
}

module.exports = router;