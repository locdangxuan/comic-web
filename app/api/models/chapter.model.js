const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
    comicID: {
        type: String,
        required: true,
        trim: true
    },
    detail: [{
        chapterNumber: {
            type: Number,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: [{
            type: String,
            trim: true
        }],
        video: {
            type: String,
            trim: true,
            default: null
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

        timeUpLoadChapter: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('Chapter', chapterSchema, 'chapters');