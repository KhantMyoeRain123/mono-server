const express = require("express");
const router = express.Router();
const {User, Room}=require("../models")
const UserFriend=require("../models/user-friend");
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
//returns the pending friend requests of the user
router.get("/friends/add/pending",async (req,res)=>{
      const userId=req.session.user.id;
      const pendingFriendIds=await UserFriend.findAll({
        attributes:['userId'],
        where:{
          friendId:userId,
          requestStatus:'pending',
        } 
      });
      const pendingFriends=[];
      for (const pendingFriendId of pendingFriendIds){
        const pendingFriend=await User.findByPk(pendingFriendId.userId);
        pendingFriends.push(pendingFriend);
      }
      console.log(pendingFriends);
      res.status(200).send(`Returning pending requests...`);
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

//accepts a pending request
router.post("/friends/accept/:userId",async (req,res)=>{
    const {userId}=req.params;
    const [affectedRows]=await UserFriend.update({requestStatus:'accepted'},
    {
      where: {
        userId:userId,
        friendId:req.session.user.id,
    }});

    if(affectedRows>0){
      res.status(200).send('Accepted request from pending user...');
    }else{
      res.status(400).send('Cannot find user in pending requests...');
    }
});



module.exports = router;
