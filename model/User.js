var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    confirm: {
        type: String,
        required: true
    }
});

userSchema.methods.generateJsonWebToken = function () {
    console.log("hello")
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '5m',
    });
}

module.exports = mongoose.model("User", userSchema);
