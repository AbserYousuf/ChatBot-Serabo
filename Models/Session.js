const mongoose = require('mongoose')
const SessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:
    {
        type: String,
        default: "New Chat"
    },
}, { timestamps: true })

module.exports = mongoose.model('Session', SessionSchema)