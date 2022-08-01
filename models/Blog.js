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
  image: {
    type: String
  },
  category: {
    type: String
  },
  status: {
    type: String,
    default: 'Unpublish'
  }
})

module.exports = mongoose.model('Blog', BlogSchema)