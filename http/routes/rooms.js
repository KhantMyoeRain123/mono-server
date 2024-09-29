const express = require("express");
const router = express.Router();
//models
const {User,Room}=require("../models");
//schemas
const roomIdSchema=require("../schemas/room-schema");

//create a room
router.post("/",async (req,res)=>{
  const creatingUserId=req.session.user.id;
  const { roomName }=req.body;
  const newRoom = await Room.create({ roomName });
  const creatingUser= await User.findByPk(creatingUserId)
  await newRoom.addUser(creatingUser)
  res.status(201).send(`A new room is created: ${newRoom.id}, ${newRoom.roomName}`);
});

//join a room with roomId
router.post("/join/:id",async (req,res)=>{
  const joiningUserId=req.session.user.id;
  const { error, value } = roomIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const joiningUser=await User.findByPk(joiningUserId);
  const roomToJoin=await Room.findByPk(value.id);
  await roomToJoin.addUser(joiningUser);

  res.status(200).send("Sucessfully joined room...");
});

//get a room using the roomId
router.get("/:id", (req, res) => {
  const { error, value } = roomIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  res.status(200).send(`Returning room with id: ${value.id}`);
});



module.exports = router;
