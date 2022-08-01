const Comment = require('../models/Comment')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createComment = asyncWrapper(async (req, res) => {
    const comment = await Comment.create(req.body)
    res.status(201).json({ comment })
})

const getAllComments = asyncWrapper(async (req, res) => {
    const { id: blogID } = req.params
    const comment = await Comment.find({blogId: blogID })
    if (!comment) {
        return next(createCustomError(`No task with id : ${blogID}`, 404))
    }
    res.status(200).json({ comment })
})

module.exports = {
    createComment,
    getAllComments,
}