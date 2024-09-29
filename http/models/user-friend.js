const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("../models/user");
const Room=require("../models/room");
const UserFriend = sequelize.define('UserFriends', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'  // Could be 'pending', 'accepted', etc.
    }
});

module.exports=UserFriend;