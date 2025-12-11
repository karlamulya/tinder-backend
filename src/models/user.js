const mongoose = require("mongoose");
const validator = require("validator");
const JWT_SECRET = "devTinder$123";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userScheme = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName : {
        type: String
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type: String,
        required:true,
    },
    mobile:{
        type: Number,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is invalid")  
            }
        }
    },
    about:{
        type: String,
    },
    photo:{
        type: String,
    },
    about:{
        type: String,
        default:'this is defaults about of user'
    },
    skills:{
        type: [String]
    }
}, {
    timestamps: true
});
userScheme.methods.getJwt = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn:"1d"});
    return token;
}

userScheme.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid
}

const User = mongoose.model("User", userScheme);



module.exports = User;