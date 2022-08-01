const express = require('express')
const router = express.Router()

const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory
} = require('../controllers/category')

router.route('/').get(getAllCategories)
router.route('/create').post(createCategory)
router.route('/:id').patch(updateCategory).delete(deleteCategory)

module.exports = router