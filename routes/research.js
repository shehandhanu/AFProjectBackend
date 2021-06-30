const express = require('express')
const router = express.Router()

// Import Research Controllers
const { addResearchPapers,
    getResearchPapers,
    updateResearchPapers,
    deleteResearchPapers,
    getAllResearchPapers } = require('../controllers/researchController')

const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')

//Research Publication
router.route('/researchpublication').post(isAuthenticatedUser, addResearchPapers);
//Get Research Papers
router.route('/researchpapers/:id').get(isAuthenticatedUser, getResearchPapers);
//get all research
router.route('/allresearchpapers').get(isAuthenticatedUser, authorizeRoles('Admin'), getAllResearchPapers);
//Update Research Papers 
router.route('/updateresearchpapers/:id').post(updateResearchPapers);

router.route('/deleteresearchpapers/:id').post(deleteResearchPapers);

// router.route('/updateuser').post(isAuthenticatedUser, authorizeRoles('Admin'), updateUser)
// //Logout User
// router.route('/signout').get(logoutUser)


module.exports = router;