const Payment = require('../models/payments');
const sendToken = require('../utils/jwtToken');

//save payment details
exports.savePaymentDetails = async (req, res, next) =>{

    console.log(req.user.paymentDetails.cardNumber);

    const {  paymentDescription, amount, cardNumber, cardName, cardCVV, cardExpireDate} = req.body;

    const payment = await Payment.create({
        userID: req.user.id,
        paymentDescription,
        amount,
        cardNumber,
        cardName,
        cardCVV,
        cardExpireDate
        // cardNumber : req.user.paymentDetails.cardNumber,
        // cardName : req.user.paymentDetails.cardName,
        // cardCVV : req.user.paymentDetails.cardCVV,
        // cardExpireDate : req.user.paymentDetails.cardExpireDate


    })
    res.status(200).json({
        success: true,
        payment,
        message: "Payment records added successfully"
    })
}

exports.getPaymentDetails = async(req, res, next) =>{
    const payments = await Payment.find()
    res.status(200).json({
        success: true,
        payments,
        message: "Payment load  successfully"
    })
}

exports.getOwnPaymentDetails = async(req, res, next) =>{
    const payments = await Payment.find({userID:req.user.id})
    res.status(200).json({
        success: true,
        payments,
        message: "Payment load  successfully"
    })
}

