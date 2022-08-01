const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  personName: {
    type: String
  }
},
{ timestamps: true },
{ collection: 'likes' })

module.exports = mongoose.model('Like', LikeSchema)
