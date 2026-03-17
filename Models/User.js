const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetOTP: {
        type: String
    },
    resetOTPExpire: {
        type: Date
    },
    resetOTPAttempts: {
        type: Number,
        default: 0
    },
    resetToken: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('User', UserSchema)