const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, unique: true },
    token: String,
    stocks: [String]
});

module.exports = mongoose.model('User', userSchema);