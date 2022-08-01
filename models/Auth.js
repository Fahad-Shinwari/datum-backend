const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    permissions: {type : Array , "default" : []}
},
{ collection: 'users' })

module.exports = mongoose.model('User', UserSchema)