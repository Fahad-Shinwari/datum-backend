const mongoose = require('mongoose')

const NavigationSchema = new mongoose.Schema({
  navigationMenu: {
    type: Array,
    required: true,
  },
},
{ timestamps: true },
{ collection: 'navigations' })

module.exports = mongoose.model('Navigation', NavigationSchema)
