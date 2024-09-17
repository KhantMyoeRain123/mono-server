const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { hashPassword, verifyPassword } = require("../utils/hash-password");

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  const { salt, hashedPassword } = hashPassword(password);
  const newUser = await User.create({ username, hashedPassword, salt });
  res.send(`Created user ${newUser.username} successfully...`);
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const [user] = await User.findAll({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.sendStatus(401);
  }
  if (verifyPassword(password, user.hashedPassword, user.salt)) {
    req.session.user = { id: user.id, username: user.username };
    res.json(req.session.user);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
