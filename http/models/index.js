const User = require('./User');
const Room = require('./Room');
const UserRoom = require('./user-room');
const UserFriend=require('./user-friend');
//User to Room association
User.belongsToMany(Room, { through: UserRoom, foreignKey: 'userId' });
Room.belongsToMany(User, { through: UserRoom, foreignKey: 'roomId' });


//User to Friends association
User.belongsToMany(User, {
    as: 'Friends',       
    through: UserFriend, 
    foreignKey: 'userId',   
    otherKey: 'friendId'    
}); 


module.exports = {
    User,
    Room
};