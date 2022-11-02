const Blog = require('../models/Blog')
const Image = require('../models/Image')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const express = require('express')
const app = express()

const getBlog = asyncWrapper(async (req, res, next) => {
    const { id: blogID } = req.params
    const blog = await Blog.findOne({ _id: blogID })
    const image = await Image.find({ blogId: blogID })

    if (!blog) {
        return next(createCustomError(`No task with id : ${blogID}`, 404))
    }
  
    res.status(200).json({ blog,image })
})

const getAllBlogs = asyncWrapper(async (req, res) => {
    const blog = await Blog.find().sort({_id: -1})
    res.status(200).json({ blog })
})

const getMostLikedBlogs = asyncWrapper(async (req, res) => {
  const blog = await Blog.find().sort({likes: -1}).limit(5)
  res.status(200).json({ blog })
})

const updateBlog = asyncWrapper(async (req, res, next) => {
    const { id: categoryID } = req.params
    
    const blog = await Blog.findOneAndUpdate({ _id: categoryID }, {status:req.body.status}, {
      new: true,
      runValidators: true,
    })
  
    if (!blog) {
      return next(createCustomError(`No category with id : ${categoryID}`, 404))
    }
  
    res.status(200).json({ blog })
})

module.exports = {
    getAllBlogs,
    getBlog,
    updateBlog,
    getMostLikedBlogs
}