const express = require("express");
const router = express.Router();
const {User, Room}=require("../models")
//get the rooms the user is in
router.get("/rooms", async (req, res) => {
  const userId=req.session.user.id;
  const userWithRooms= await User.findByPk(userId,{
    include:[
     Room 
    ]
  });

  userWithRooms.Rooms.forEach((room,index)=>{
    console.log(room.roomName);
  });

  res.status(200).send(`Returning rooms for user with id: ${req.session.user.id}`);
});

//send a friend request
router.post("/friends/add/:userId", async (req,res)=>{
    const initiatingUser=await User.findByPk(req.session.user.id);
    const {userId}=req.params;
    const befriendedUser= await User.findByPk(userId);
    if (initiatingUser.id===befriendedUser.id){
      res.status(400).send("Cannot add yourself as your friend that's a bit sad...");
      return
    }
    if(!befriendedUser){
      res.status(400).send("Cannot find user requested...");
      return
    }
    await initiatingUser.addFriend(befriendedUser);

    res.status(200).send(`Sent a friend request to ${befriendedUser.username}`);
});

module.exports = router;
