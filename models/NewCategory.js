const mongoose = require('mongoose')

const NewCategorySchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default:null
  },
  title: {
    type: String
  },
  link: {
    type: String
  },
  sorts: {
    type: Number,
    min: 0,
    max: 9999
  }

},
{ timestamps: true },
{ collection: 'newCategory' })

module.exports = mongoose.model('NewCategory', NewCategorySchema)
