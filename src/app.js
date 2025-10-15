const express = require('express');
const app = express();

const {isAdminAuth} = require("./middlewares/auth")


app.use("/admin", isAdminAuth);

app.get("/admin/getAllData",(req,res)=>{
    // throw new Error("thorw error");
    try{
        throw new Error("thorw error");
    res.send("getAllData");

    }catch{
         res.status(500).send("something  wrong")
    }

})

app.use('/',(err, req, res, next)=>{
    if(err){
    res.status(500).send("something wnet wrong")
    }
})

app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})