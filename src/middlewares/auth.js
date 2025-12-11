const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "devTinder$123";
const userAuth = async (req,res, next)=>{
    try{
        const cookies = req.cookies;
        const { token} = cookies;
        if(!token){
            throw new Error("Token is not valid!!!!!!");
        }
        const decodedMessage = await jwt.verify(token,JWT_SECRET);
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User Not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error "+err.message);
    }
}

module.exports = {userAuth}