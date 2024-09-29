const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Room = sequelize.define("Room", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});
  
module.exports = Room;