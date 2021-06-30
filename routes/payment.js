const express = require('express')
const router = express.Router()

const { savePaymentDetails, getPaymentDetails, getOwnPaymentDetails } = require('../controllers/paymentController')
const { isAuthenticatedUser, authorizeRoles } = require('../utils/authenticator')
//save payment details
router.route('/savePayDet/:id').post(isAuthenticatedUser, savePaymentDetails);
router.route('/getPayDetails').get(isAuthenticatedUser, authorizeRoles('Admin'), getPaymentDetails);
router.route('/getPayOwnDetails').get(isAuthenticatedUser, getOwnPaymentDetails);

module.exports = router