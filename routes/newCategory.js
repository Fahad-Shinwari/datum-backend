const express = require('express')
const router = express.Router()

const {
    getNewCategory,
    createNewCategory
} = require('../controllers/newCategory')

router.route('/add').post(createNewCategory)
router.route('/').get(getNewCategory)

module.exports = router