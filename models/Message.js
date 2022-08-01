const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},
{ timestamps: true },
{ collection: 'messages' })

module.exports = mongoose.model('Message', MessageSchema)
