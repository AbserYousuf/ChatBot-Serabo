const mongoose = require('mongoose')
const { Schema } = mongoose;
const ChatSchema = new Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    role: {
        type: String,
        enum: ['user', 'assistant'],  // only these two values allowed
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tokens: {
        type: Number,
        default: 0       // optional, track AI token usage
    },
    model: {
        type: String,
        default: "gpt-4o" // which AI model was used
    }
}, { timestamps: true });
module.exports = mongoose.model('Chat', ChatSchema)