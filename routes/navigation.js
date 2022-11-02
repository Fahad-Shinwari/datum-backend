const express = require('express')
const router = express.Router()

const {
    updateCategory,
    createCategory,
    getCategory
} = require('../controllers/navigation')

router.route('/').post(createCategory)
router.route('/:id').put(updateCategory).get(getCategory)

module.exports = router