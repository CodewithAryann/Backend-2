const express= require('express');
const app = express();

const usermodel = require('./usersmodel');

app.get("/", (req,res)=>{
    res.send("hey");
})

app.get('/create', (req, res)=>{
    usermodel.create({
        name: "John",
        email: "john@example.com",
        username: "john"
    })
})

app.listen(3000);