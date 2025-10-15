const express = require('express');
const app = express();

const {isAdminAuth} = require("./middlewares/auth")

// app.use("/home",(req, res)=>{
//     res.send("This is home page");
// });

// app.use("/hello", (req, res)=>{
//     res.send("This is hello page")
// })

// app.use("/", (req, res)=>{
//     res.send("This is start page")
// })

// app.get("/user", (req,res)=>{
//     res.send("got the data")
// });

app.use("/admin", isAdminAuth);

app.get("/admin/getAllData",(req,res)=>{
    res.send("getAllData")
})

// app.use("/hello", 
//     (req, res, next)=>{
//     res.send("This is hello page1");
//     next();
// },
// (req, res, next)=>{
//     res.send("This is hello page 2");
//     next();
// },
// (req, res, next)=>{
//     res.send("This is hello page 3");
//     next();
// },
// )


app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})