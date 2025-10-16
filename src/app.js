const express = require('express');
const app = express();

const connectDB = require("./config/database");
const User = require('./models/user');

app.post("/signup", async(req, res)=>{
  const user = new User({
    firstName:"Prabhas",
    lastName:"uppalapati",
    email:"Prabhas@gmail.com",
    mobile:"8977732065"
  });

  try{
    await user.save();
    res.send("User Saved SuccesFully")
  }catch{
        res.status(400).send("Api Failed")
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
