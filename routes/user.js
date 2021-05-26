const express = require('express')
const router = express.Router()

const { registerUser,
    getUserProfile,
    loginUser,
    updateUser,
    logoutUser } = require('../controllers/userController')

const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')

//User Registration
router.route('/signup').post(registerUser);
//Get User Profile
router.route('/profile/:id').get(isAuthenticatedUser, getUserProfile)
//User Login 
router.route('/signin').post(loginUser)
//Update User
router.route('/updateuser').post(isAuthenticatedUser, authorizeRoles('Admin'), updateUser)
//Logout User
router.route('/signout').get(logoutUser)

module.exports = router;