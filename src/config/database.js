const mongoose = require("mongoose");


const connectDB = async()=>{
await mongoose.connect(
    "mongodb+srv://karlamulya341_db_user:Amulya17@cluster0.qybpa6s.mongodb.net/devTinder"
);
}

module.exports = connectDB;


