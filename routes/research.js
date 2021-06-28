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
router.route('/allresearchpapers').get(isAuthenticatedUser, getAllResearchPapers);
//Update Research Papers 
router.route('/updateresearchpapers/:id').post(updateResearchPapers);


module.exports = router;