const express = require('express');
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRoute = require("./routes/request");


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRoute);



connectDB().then(()=>{
    console.log("connect succesful DB");
    
app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})
})
.catch(()=>{
    console.log("Errror in connecting db");
    
})
