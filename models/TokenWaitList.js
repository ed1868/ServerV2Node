const mongoose = require('mongoose')

const tokenWaitListSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Your First name is required'],
    },
    email: {
        type: String,
        require: true,
    },
    confirmationCode: {
        type: String,
        required: true,
        unique: true
    },
    confirmed: {
        type: String,
        enum: ['confirmed', 'not confirmed'],
        default: 'not confirmed'
    },
    approved: {
        type: String,
    },
})

const TokenWaitList = mongoose.model('TokenWaitList', tokenWaitListSchema)

module.exports = TokenWaitList
