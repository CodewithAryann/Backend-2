const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userModels = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/testapp1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    try {
        let users = await userModels.find();
        console.log('Fetched users:', users); // Debugging log
        res.render("read", { users });
    } catch (error) {
        console.error('Error retrieving users:', error); // Debugging log
        res.status(500).send("Error retrieving users.");
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await userModels.findOneAndDelete({ _id: req.params.id });
        res.redirect("/read");
    } catch (error) {
        console.error('Error deleting user:', error); // Debugging log
        res.status(500).send("Error deleting user.");
    }
});

app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        const createdUser = await userModels.create({ name, email, image });
        console.log('User created:', createdUser); // Debugging log
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user:', error); // Debugging log
        res.status(500).send("Error creating user.");
    }
});

// Route to display the edit form
app.get('/edit/:id', async (req, res) => {
    try {
        let user = await userModels.findById(req.params.id);
        if (user) {
            res.render('edit', { user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error); // Debugging log
        res.status(500).send("Error fetching user.");
    }
});

// Route to handle form submission and update user
app.post('/edit/:id', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        let updatedUser = await userModels.findByIdAndUpdate(req.params.id, {
            name,
            email,
            image
        }, { new: true });
        console.log('User updated:', updatedUser); // Debugging log
        res.redirect('/read');
    } catch (error) {
        console.error('Error updating user:', error); // Debugging log
        res.status(500).send("Error updating user.");
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
