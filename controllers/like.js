const Like = require('../models/Like')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createLike = asyncWrapper(async (req, res) => {
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
    res.status(200).json({ like })
})

module.exports = {
    createLike,
    getOneLike,
    getAllLikes,
    deleteLike
}