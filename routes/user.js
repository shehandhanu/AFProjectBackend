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
    approveSessions,
    notificationMarker,
    approveReseachPapers,
    getAllApprovedResearchPapers,
    getNotification } = require('../controllers/userController')

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
//notification
router.route('/notifications').get(isAuthenticatedUser, getNotification)
//Mark As Read Notification
router.route('/marknotification/:id').get(isAuthenticatedUser, notificationMarker)


//Admin
//Update User
router.route('/admin/updateuser').put(isAuthenticatedUser, authorizeRoles('Admin'), updateUserRole)
//Get Users
router.route('/admin/getusers').get(isAuthenticatedUser, authorizeRoles('Admin'), getAllUsers)
//Session Approvel
router.route('/admin/approvesession/:id').get(isAuthenticatedUser, /*authorizeRoles('Admin'),*/ approveSessions)
//Research Paper Approvel
router.route('/admin/approveresearch/:id').get(isAuthenticatedUser, /*authorizeRoles('Admin'),*/ approveReseachPapers)

//Get All Approved Sessions
router.route('/getsessions').get(getAllApprovedSessions)
//Get All Approved Researches
router.route('/getresearches').get(getAllApprovedResearchPapers)


module.exports = router;