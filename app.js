const express = require('express')
const app = express();
const path = require('path');
const userModels = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
    res.render("index");
})

app.get('/read', async (req,res)=>{
    res.render("read");
})
app.post('/create', (req,res)=>{
    let { name, email, image} = req.body
    let createduser = await userModels.create({
        name,
        email,
        image
    })
    res.send( createduser);
})



app.listen(3000);