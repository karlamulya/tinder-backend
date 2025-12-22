const express = require("express");
const requestRoute = express.Router();
const User = require('../models/user');
const {userAuth} = require("../middlewares/auth")
requestRoute.get("/sendConnection", userAuth, async(req, res)=>{
  try{  
    res.send("Connection sent");
  }catch(err){
    res.status(400).send("sendConnection failed ", err.message)
  }
});


requestRoute.get("/user", async(req, res)=>{
  const userEmail = req.body.email;
  try{
    const user = await User.findOne({email: userEmail}).exec();
    if(!user){
      res.status(400).send("User not found");
    }else{
      res.send(user);
    }

  }catch{
    res.status(400).send("something went wrong");
  }
});
module.exports = requestRoute;