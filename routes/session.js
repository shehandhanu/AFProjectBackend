const express = require('express')
const router = express.Router()

// Import session Controllers
const { registersession,
    getsession,
    updatesession,
    savesession } = require('../controllers/sessionController')

//session Registration
router.route('/insert').post(registersession);
//Get session
router.route('/session/:id').get( getsession)
//Update session
router.route('/updatesession').post( updatesession)

module.exports = router;
