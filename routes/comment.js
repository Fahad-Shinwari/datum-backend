const express = require('express')
const router = express.Router()

const {
    createComment,
    getAllComments
} = require('../controllers/comment')

router.route('/create').post(createComment)
router.route('/:id').get(getAllComments)

module.exports = router