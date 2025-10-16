const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName : {
        type: String
    },
    email: {
        type: String
    },
    mobile:{
        type: Number
    },
    gender:{
        type: String
    }
});

const User = mongoose.model("User", userScheme);

module.exports = User;