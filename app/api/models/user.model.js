const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        max: 1024
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    token: {
        default: null,
        type: String,
    },
    locked: {
        default: false,
        type: Boolean,
    },
    isAdmin: {
        default: false,
        type: Boolean
    },
    avatar: {
        type: String,
        default: null
    },
    notification:[{
        type :String,
        trim: true
    }]
});

module.exports = mongoose.model('User', userSchema, 'users');