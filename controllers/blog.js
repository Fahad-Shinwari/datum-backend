const Blog = require('../models/Blog')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const express = require('express')
const app = express()
const multer = require('multer')

// Multetr files

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
      console.log(file);
    },
   
  })
  
const upload = multer({ storage: storage }).single('file')


const uploadImage = (function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)
    })
})  
  
const createBlog = asyncWrapper(async (req, res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json({ blog })
})

const getBlog = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const blog = await Blog.findOne({ _id: taskID })

    if (!blog) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
  
    res.status(200).json({ blog })
})

const getAllBlogs = asyncWrapper(async (req, res) => {
    const blog = await Blog.find().sort({_id: -1})
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
    createBlog,
    getAllBlogs,
    uploadImage,
    getBlog,
    updateBlog
}