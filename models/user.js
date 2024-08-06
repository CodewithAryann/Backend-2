const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testapp1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
