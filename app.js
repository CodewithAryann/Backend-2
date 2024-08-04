const express = require('express');
const app = express();
const usermodel = require('./usersmodel');

app.get("/", (req, res) => {
    res.send("hey");
});

app.get('/create', async (req, res) => {
    try {
        let createuser = await usermodel.create({
            name: "John",
            email: "john@example.com",
            username: "john"
        });
        res.send(createuser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/update', async (req, res) => {
    try {
        let updateduser = await usermodel.findOneAndUpdate(
            { username: "john" },
            { name: "John" },
            { new: true }
        );
        res.send(updateduser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/read", async (req,res)=>{
    let users = await usermodel.find();
    res.send(users);
})

app.listen(3000);