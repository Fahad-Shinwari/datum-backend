const Like = require('../models/Like')
const Blog = require('../models/Blog')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createLike = asyncWrapper(async (req, res) => {
    // console.log(req.body)
    // const blog = await Blog.find({ _id: req.body.blogId })
    const blog = await Blog.findOneAndUpdate({ _id: req.body.blogId }, {$inc : {'likes' : 1}}, {
        new: true,
        runValidators: true,
      })
    
      if (!blog) {
        return next(createCustomError(`No category with id : ${req.body.blogId}`, 404))
      }
    // console.log(blog)
    const like = await Like.create(req.body)
    res.status(201).json({ like })
})

const getAllLikes = asyncWrapper(async (req, res) => {
    const like = await Like.find({ blogId: req.body.blogId })
    res.status(200).json({ like })
})

const getOneLike = asyncWrapper(async (req, res) => {
    const like = await Like.findOne({blogId: req.body.blogId, personName: req.body.personName })
    res.status(200).json({ like })
})

const deleteLike = asyncWrapper(async (req, res) => {
    const like = await Like.findOneAndDelete({blogId: req.body.blogId, personName: req.body.personName })
    if (!like) {
      return next(createCustomError(`No like with id exists`, 404))
    }
    const blog = await Blog.findOneAndUpdate({ _id: req.body.blogId }, {$inc : {'likes' : -1}}, {
        new: true,
        runValidators: true,
      })
    
      if (!blog) {
        return next(createCustomError(`No category with id : ${req.body.blogId}`, 404))
      }
    res.status(200).json({ like })
})

module.exports = {
    createLike,
    getOneLike,
    getAllLikes,
    deleteLike
}