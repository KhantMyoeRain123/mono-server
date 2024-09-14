var express = require('express');
var router = express.Router();
const User = require('../models/user');


router.post('/signup',async function(req,res){
    const {username,password}=req.body;
    const newUser=await User.create({username,password});
    res.send(`Created user ${newUser.username} successfully...`);
});

router.get('/login', function(req, res, next) {
    
});

module.exports = router;