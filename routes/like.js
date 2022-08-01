const express = require('express')
const router = express.Router()

const {
    createLike,
    getAllLikes,
    getOneLike,
    deleteLike
} = require('../controllers/like')

router.route('/create').post(createLike)
router.route('/one').post(getOneLike)
router.route('/all').post(getAllLikes)
router.route('/delete').delete(deleteLike)

module.exports = router