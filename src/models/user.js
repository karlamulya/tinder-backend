const mongoose = require("mongoose");

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
        trim:true
    },
    mobile:{
        type: Number
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

const User = mongoose.model("User", userScheme);

module.exports = User;