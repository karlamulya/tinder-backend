const express = require('express');
const app = express();

app.use("/home",(req, res)=>{
    res.send("This is home page");
});

app.use("/hello", (req, res)=>{
    res.send("This is hello page")
})

app.use("/", (req, res)=>{
    res.send("This is start page")
})

app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})