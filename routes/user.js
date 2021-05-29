const express = require('express')
const router = express.Router()

// Import User Controllers
const { registerUser,
    getUserProfile,
    loginUser,
    updateUser,
    logoutUser,
    updateUserRole,
    getAllUsers } = require('../controllers/userController')

const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')

//User Registration
router.route('/signup').post(registerUser);
//Get User Profile
router.route('/profile').get(isAuthenticatedUser, getUserProfile)
//User Login 
router.route('/signin').post(loginUser)
//Update User
router.route('/updateuser').post(isAuthenticatedUser, authorizeRoles('Admin'), updateUser)
//Logout User
router.route('/signout').get(logoutUser)

//Admin
//Update User
router.route('/admin/updateuser').put(isAuthenticatedUser, authorizeRoles('Admin'), updateUserRole)
//Get Users
router.route('/admin/getusers').get(isAuthenticatedUser, authorizeRoles('Admin'), getAllUsers)

module.exports = router;