const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide title'],
  },
  slug: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  likes: {
    type: Number,
    default: 0,
    min:0
  },
  status: {
    type: String,
    default: 'Unpublish'
  },
  thumbnail: {
    type: String
  }
})

module.exports = mongoose.model('Blog', BlogSchema)