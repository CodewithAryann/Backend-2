const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:3000/testapp1');

const UserSchema = mongoose.connect({
    name: String,
    image: String,
    email:String,

})

module.exports = mongoose.module('user', UserSchema)