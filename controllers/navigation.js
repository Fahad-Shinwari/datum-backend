const Navigation = require('../models/Navigation')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createCategory = asyncWrapper(async (req, res) => {
  const navigation = await Navigation.create(req.body)
  res.status(201).json({ navigation })
})

const updateCategory = asyncWrapper(async (req, res, next) => {
  const { id: navigationID } = req.params

  const navigation = await Navigation.findOneAndUpdate({ _id: navigationID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!navigation) {
    return next(createCustomError(`No category with id : ${navigationID}`, 404))
  }

  res.status(200).json({ navigation })
})

const getCategory = asyncWrapper(async (req, res) => {
  const navigation = await Navigation.find()
  res.status(200).json({ navigation })
})

module.exports = {
  updateCategory,
  createCategory,
  getCategory
}