const express = require('express')
const router = express.Router()

const {
    addMessage,
    getMessages
} = require('../controllers/message')

router.route('/addmsg').post(addMessage)
router.route('/getmsg').post(getMessages)

module.exports = router