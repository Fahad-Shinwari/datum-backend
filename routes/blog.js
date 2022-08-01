const express = require('express')
const router = express.Router()

const {
  createBlog,
  getAllBlogs,
  uploadImage,
  getBlog,
  updateBlog
} = require('../controllers/blog')

router.route('/').get(getAllBlogs)
router.route('/create').post(createBlog)
router.route('/upload').post(uploadImage)
router.route('/:id').get(getBlog).patch(updateBlog)

module.exports = router