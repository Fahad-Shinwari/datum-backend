const express = require('express')
const router = express.Router()

const {
  getAllBlogs,
  getBlog,
  updateBlog,
  getMostLikedBlogs
} = require('../controllers/blog')

router.route('/').get(getAllBlogs)
router.route('/liked').get(getMostLikedBlogs)
router.route('/:id').get(getBlog).put(updateBlog)

module.exports = router