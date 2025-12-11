const express = require('express');
const app = express();
const {validateSignUpDate} = require("./utils/validation")
const connectDB = require("./config/database");
const User = require('./models/user');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');

const {userAuth} = require("./middlewares/auth")
app.use(express.json());
app.use(cookieParser())
const jwt = require("jsonwebtoken");

app.post("/signup", async(req, res)=>{
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

app.post("/login", async (req, res)=>{
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

app.get("/profile", userAuth, async(req, res)=>{  
  try{
    const user = req?.user;
    res.send(user)

  }catch{    
    res.status(400).send("User not found"+ decodedMessage);
  }
});

app.get("/sendConnection", userAuth, async(req, res)=>{
  try{  
    res.send("Connection sent");
  }catch(err){
    res.status(400).send("sendConnection failed ", err.message)
  }
})

app.get("/user", async(req, res)=>{
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

connectDB().then(()=>{
    console.log("connect succesful DB");
    
app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})
})
.catch(()=>{
    console.log("Errror in connecting db");
    
})
