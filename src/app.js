const express = require('express');
const app = express();

const connectDB = require("./config/database");
const User = require('./models/user');
app.use(express.json());
app.post("/signup", async(req, res)=>{

  const user = new User(req.body);

  try{
    await user.save();
    res.send("User Saved SuccesFully")
  }catch{
        res.status(400).send("Api Failed")
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
