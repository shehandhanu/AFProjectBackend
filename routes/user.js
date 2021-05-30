const express = require('express')
const router = express.Router()

// Import User Controllers
const { registerUser,
    getUserProfile,
    loginUser,
    updateUser,
    logoutUser,
    updateUserRole,
    getAllUsers,
    getAllApprovedSessions,
    notificationMarker } = require('../controllers/userController')

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
//Session Approvel
router.route('/admin/approvesession').get(isAuthenticatedUser, authorizeRoles('Admin'), getAllApprovedSessions)
//Mark As Read Notification
router.route('/admin/marknotification/:id').get(isAuthenticatedUser, notificationMarker)


module.exports = router;