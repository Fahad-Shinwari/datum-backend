let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    router = express.Router(),
    sharp = require('sharp'),
    path = require('path'),
    fs = require('fs')

    const DIR = 'images/';
const Blog = require('../models/Blog')
const Image = require('../models/Image')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/upload-blog',upload.array('image', 6), async(req, res, next) => {
  // console.log("nmdfknk");
  // const reqFiles = [];
  let thumbnailFiles = "";
  let firstFile = {}
  const url = req.protocol + '://' + req.get('host')
  thumbnailFiles = url + '/images/resized/' + req.files[0].filename
  const response = await Blog.create({
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    thumbnail: thumbnailFiles
})
  console.log(req.files[0].filename)
  for (var i = 0; i < req.files.length; i++) {
      // reqFiles.push(url + '/images/' + req.files[i].filename) 
      // Create a seperate image and attach blogId with it 
      const createImage = await Image.create({
        blogId: response._id,
        image: url + '/images/' + req.files[i].filename
      })
      // thumbnailFiles.push(url + '/images/resized/' + req.files[0].filename)  
      firstFile = req.files[0]
  }
  
  sharp(firstFile.path)
  .resize({ width: 400, height: 400, fit: 'fill' })
  .toFile(path.resolve(firstFile.destination,'resized',firstFile.filename), function(err) {
    console.log(err)
    });
    res.status(200).json({ message: "Uploaded" })
  
//   const blog = new Blog({
//       title: req.body.title,
//       slug: req.body.slug,
//       description: req.body.description,
//       category: req.body.category,
//       status: req.body.status,
//       thumbnail: thumbnailFiles
//   });
//   blog.save().then(result => {
//       res.status(201).json({
//           message: "Done upload!",
//       })
//   }).catch(err => {
//       console.log(err),
//           res.status(500).json({
//               error: err
//           });
//   })
})

module.exports = router;