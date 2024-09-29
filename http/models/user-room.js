const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("../models/user");
const Room=require("../models/room");
const UserRoom = sequelize.define("UserRoom", {
    /*userId: {
      type: DataTypes.INTEGER,
      references:{
        model:"Users",
        key:'id',
      },
      primaryKey: true,
    },
    roomId:{
      type: DataTypes.INTEGER,
      references:{
        model:"Rooms",
        key:'id',
      },
      primaryKey: true,
    },*/
});
module.exports = UserRoom;