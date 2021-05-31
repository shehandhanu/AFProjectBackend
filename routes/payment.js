const express = require('express')
const router = express.Router()

const { savePaymentDetails, getPaymentDetails, getOwnPaymentDetails} = require('../controllers/paymentController')
const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')
//save payment details
router.route('/savePayDet').post(isAuthenticatedUser,savePaymentDetails);
router.route('/getDetails').get(isAuthenticatedUser,authorizeRoles('Admin'),getPaymentDetails);
router.route('/getOwnDetails').get(isAuthenticatedUser,getOwnPaymentDetails);

module.exports = router