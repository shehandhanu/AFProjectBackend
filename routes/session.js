const express = require('express')
const router = express.Router()

// Import session Controllers
const { registerSessionPraposal,
    getsession,
    updatesession,
    getAllSessions,
    joinToSession,
    getAllJoinedSession,
    leftJoinedSession,
    registerSession } = require('../controllers/sessionController')

const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')


//Session Praposal Registration
router.route('/createsessionpraposal').post(isAuthenticatedUser, registerSessionPraposal);
//Session Createtion
router.route('/createsession/:id').get(isAuthenticatedUser, registerSession)
//Get Session
router.route('/session/:id').get(getsession)
//Update Session
router.route('/updatesession').post(updatesession)
//Get All Sessions
router.route('/allsessions').get(getAllSessions)
//Take Attendee For Sessions
router.route('/joinsession/:id').get(isAuthenticatedUser, joinToSession)
//Take Joined Sessions
router.route('/joinedsession').get(isAuthenticatedUser, getAllJoinedSession)
//Remove Joined Sessions
router.route('/leftsession/:id').get(isAuthenticatedUser, leftJoinedSession)

module.exports = router;
