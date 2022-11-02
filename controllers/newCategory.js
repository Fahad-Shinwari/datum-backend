const NewCategory = require('../models/NewCategory')
const asyncWrapper = require('../middleware/async')

const createNewCategory = asyncWrapper(async (req, res) => {
  const category = await NewCategory.create(req.body)
  res.status(201).json({ category })
})

const getNewCategory = asyncWrapper(async (req, res) => {
  const category = await NewCategory.find()
  res.status(200).json({ category })
})

module.exports = {
  createNewCategory,
  getNewCategory
}