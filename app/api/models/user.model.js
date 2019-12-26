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
    gender:{
        type: Boolean,
        required: true
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
    isAuthor: {
        default: false,
        type: Boolean
    },
    avatar: {
        type: String,
        default: "https://cdn4.iconfinder.com/data/icons/seo-web-blue-1/100/seo__web_blue_1_22-512.png"
    },
    notification:[{
        type :String,
        trim: true
    }]
});

module.exports = mongoose.model('User', userSchema, 'users');