const express = require("express");
const profile = express();
const profileRouter = express.Router();
const cookieParser = require('cookie-parser');
const {userAuth} = require("../middlewares/auth")
profile.use(express.json());
profile.use(cookieParser())

profileRouter.get("/profile", userAuth, async(req, res)=>{  
  try{
    const user = req?.user;
    res.send(user)

  }catch{    
    res.status(400).send("User not found"+ decodedMessage);
  }
});

module.exports = profileRouter;