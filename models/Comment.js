const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String
  },
  personName: {
    type: String
  }
},
{ timestamps: true },
{ collection: 'comments' })

module.exports = mongoose.model('Comment', CommentSchema)
