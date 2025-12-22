const express = require("express");
const auth = express();
const {validateSignUpDate} = require("../utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
auth.use(express.json());
auth.use(cookieParser())
const authRouter = express.Router();
const User = require('../models/user');

authRouter.post("/signup", async(req, res)=>{
  try{
    validateSignUpDate(req.body);
    const {firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash
    });    
    await user.save();
    res.send("User Saved SuccesFully")
  }catch(Err){
        res.status(400).send("Api Failed "+ Err.message);
  }

})

authRouter.post("/login", async (req, res)=>{
  try{    
    const {email, password} = req.body;
    const user = await User.findOne({email: email});    
    if(!user){
      throw new Error("Email is not valid");
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){
      const token = await user.getJwt();      
      res.cookie("token", token);
      res.send("Login SuccessFul");
    }else{
      throw new Error("Password is not valid")
    }


  }catch(Err){
    res.status(400).send("something went wrong "+ Err.message);
  }
});

module.exports = authRouter;