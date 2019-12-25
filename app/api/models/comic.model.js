const mongoose = require('mongoose');
const comicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    view: {
        type: Number,
        default: 0
    },
    comments: [{
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        }
    }],
    status: {
        type: Boolean,
        default: false
    },
    newestChapter: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    timeUpLoadNewChapter: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comic', comicSchema, 'comics');