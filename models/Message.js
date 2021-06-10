const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    userId: String,
    email:String,
    subject: String,
    text: String,
    previousMessages: Array
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
