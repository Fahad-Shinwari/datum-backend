const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide category name'],
    trim: true,
    maxlength: [30, 'Category name can not be more than 30 characters'],
  }
},
{ collection: 'categories' })

module.exports = mongoose.model('Category', CategorySchema)