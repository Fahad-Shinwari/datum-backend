const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: String
  },
},
{ timestamps: true },
{ collection: 'images' })

module.exports = mongoose.model('Image', ImageSchema)
