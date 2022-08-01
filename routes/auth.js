const express = require('express')
const router = express.Router()

const {
    changePassword,
    login,
    register,
    google,
    getAllUsers,
    updateUsersPermissions,
    deleteUsersPermissions,
    getSingleUser
} = require('../controllers/auth')

router.route('/login').post(login)
router.route('/change-password').post(changePassword)
router.route('/register').post(register)
router.route('/google').post(google)
router.route('/:id').patch(updateUsersPermissions).get(getSingleUser)
router.route('/chat/:id').get(getAllUsers)
router.route('/dlt/:id').patch(deleteUsersPermissions)

module.exports = router