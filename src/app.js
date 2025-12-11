const express = require('express');
const app = express();
const {validateSignUpDate} = require("./utils/validation")
const connectDB = require("./config/database");
const User = require('./models/user');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const JWT_SECRET = "devTinder$123";
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      const token = await jwt.sign({_id: user._id}, JWT_SECRET);      
      res.cookie("token", token);
      res.send("Login SuccessFul");
    }else{
      throw new Error("Password is not valid")
    }


  }catch(Err){
    res.status(400).send("something went wrong "+ Err.message);
  }
});

app.get("/profile", async(req, res)=>{  
  try{
    const cookie = req.cookies;
    const { token} = cookie;
    console.log(token, 'token');
    if(!token){
      throw new Error("in valid token");
    }
    const decodedMessage =  await jwt.verify(token, JWT_SECRET);
    console.log(decodedMessage,"decodedMessage");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User not found");
    }
    res.send(user)

  }catch{    
    res.status(400).send("User not found"+ decodedMessage);
  }
});

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

app.delete("/user", async(req, res)=>{
    const userId = req.body.userId;
  try{
    const user =  await User.findByIdAndDelete(userId);
      res.send("User deleted successfully");
  }catch{
      res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async(req, res)=>{
   const userId= req.params?.userId;
   const data = req.body;
   try{
    const ALLOWED_USERS = ["gender", "about", "photo", "skills"];
    const isUpdateAllowed =  Object.keys(req.body).every((field) =>
    ALLOWED_USERS.includes(field));
    if(isUpdateAllowed){
      throw new Error("Update is not allowed");
    }
      await User.findByIdAndUpdate({_id: userId}, data,
        {
          runValidators: true
        }
      );
      res.send("User updated successfully")
   }catch(err){
    res.status(400).send("Update is not allowed"+ err.message);
   }
})

app.get("/feed", async(req, res)=>{
  try{
      const user = await User.find({});
      if(user.length === 0){
        res.status(400).send("User not found");
      }
      console.log(user,"user")
      res.send(user);
  }catch{
      res.status(400).send("something went wrong");
  }

})


connectDB().then(()=>{
    console.log("connect succesful DB");
    
app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})
})
.catch(()=>{
    console.log("Errror in connecting db");
    
})
