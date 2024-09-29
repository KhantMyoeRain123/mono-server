const express = require("express");
const router = express.Router();
const {User} = require("../models");
const { hashPassword, verifyPassword } = require("../utils/hash-password");
const userSchema=require("../schemas/user-schema");
//todo:make sure the usernames are unique
router.post("/signup", async function (req, res) {
  const { error, value } = userSchema.validate(req.body);
  if(error){
    console.error("Validation error:", error.details[0].message);
  }
  const {username,password}=value;
  const { salt, hashedPassword } = hashPassword(password);
  const newUser = await User.create({ username, hashedPassword, salt });
  res.send(`Created user ${newUser.username} successfully...`);
});

router.post("/login", async function (req, res) {
  const {error,value}=userSchema.validate(req.body);
  if(error){
    console.error("Validation error:", error.details[0].message);
  }
  const {username,password}=value;
  const user = await User.findOne({
    where: {
      username: username,  // Replace with the condition you're looking for
    },
  });

  if (!user) {
    console.log("User not found...")
    res.sendStatus(401);
    return
  }
  if (verifyPassword(password, user.hashedPassword, user.salt)) {
    req.session.user = { id: user.id, username: user.username };
    res.json(req.session.user);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
