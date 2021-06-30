const express = require('express')
const router = express.Router()

// Import Research Controllers
const { addResearchPapers,
    getResearchPapers,
    updateResearchPapers,
    deleteResearchPapers} = require('../controllers/researchController')

    const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')

//Research Publication
router.route('/researchpublication').post(addResearchPapers);

//Get Research Papers
router.route('/researchpapers/:id').get(isAuthenticatedUser,getResearchPapers);
//Update Research Papers 
router.route('/updateresearchpapers/:id').post(updateResearchPapers);
//Delete Research Papers
router.route('/deleteresearchpapers/:id').post(deleteResearchPapers);

// router.route('/updateuser').post(isAuthenticatedUser, authorizeRoles('Admin'), updateUser)
// //Logout User
// router.route('/signout').get(logoutUser)

module.exports = router;