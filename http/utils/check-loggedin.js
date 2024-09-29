function isUserLoggedIn(req,res){
//check if user is logged in
  if(!req.session.user){
    res.status(401).send("You are not logged in...")
    return false
  } 
  return true
}


function checkLoggedIn(req,res,next){
  if(!isUserLoggedIn(req,res)){
    return
  }
  next();
}

module.exports=checkLoggedIn;