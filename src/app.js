const express = require('express');
const app = express();

// app.use("/home",(req, res)=>{
//     res.send("This is home page");
// });

// app.use("/hello", (req, res)=>{
//     res.send("This is hello page")
// })

// app.use("/", (req, res)=>{
//     res.send("This is start page")
// })

app.get("/user", (req,res)=>{
    res.send("got the data")
});

app.post("/user", (req,res)=>{
    res.send("post the data")    
});
app.delete("/user", (req,res)=>{
    res.send("delete the data");    
});
app.put("/user", (req,res)=>{
    res.send("put the data");  
});

app.listen(7777, ()=>{
    console.log('sucessful iwth 7777')
})