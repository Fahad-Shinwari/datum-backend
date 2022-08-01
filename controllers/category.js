const Category = require('../models/Category')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createCategory = asyncWrapper(async (req, res) => {
    const category = await Category.create(req.body)
    res.status(201).json({ category })
})

const getAllCategories = asyncWrapper(async (req, res) => {
    const category = await Category.find({})
    res.status(200).json({ category })
})

const deleteCategory = asyncWrapper(async (req, res, next) => {
    const { id: categoryID } = req.params
    const category = await Category.findOneAndDelete({ _id: categoryID })
    
    if (!category) {
      return next(createCustomError(`No category with id : ${categoryID}`, 404))
    }
    res.status(200).json({ category })
})

const updateCategory = asyncWrapper(async (req, res, next) => {
    const { id: categoryID } = req.params
  
    const category = await Category.findOneAndUpdate({ _id: categoryID }, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!category) {
      return next(createCustomError(`No category with id : ${categoryID}`, 404))
    }
  
    res.status(200).json({ category })
})

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
}