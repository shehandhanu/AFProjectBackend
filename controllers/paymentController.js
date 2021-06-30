const Payment = require('../models/payments');
const Research = require('../models/research');
const Session = require('../models/sessions');

//save payment details
exports.savePaymentDetails = async (req, res, next) => {

    const { paymentDescription, amount, cardNumber, cardName, cardCVV, cardExpireDate } = req.body;
    let paymentTypeID = req.params.id;
    console.log(paymentTypeID);
    let paymentType = null;


    let paymentT = await Research.findById(paymentTypeID)
    if (!paymentT) {
        let paymentT = await Session.findById(paymentTypeID)
        if (!paymentT) {
            return res.status(404).json({
                success: false,
                message: 'not found any recored'
            })
        }
        paymentType = 'Session Payment :- ' + paymentT.sessionName
    } else {
        paymentType = 'Publication Payment :- ' + paymentT.title
    }

    console.log(paymentType);

    const payment = await Payment.create({
        userID: req.user.id,
        paymentDescription,
        paymentType: paymentType,
        paymentTypeID: paymentTypeID,
        amount,
        cardNumber,
        cardName,
        cardCVV,
        cardExpireDate
    })

    res.status(200).json({
        success: true,
        payment,
        message: "Payment records added successfully"
    })
}

exports.getPaymentDetails = async (req, res, next) => {
    const payments = await Payment.find()
    res.status(200).json({
        success: true,
        payments,
        message: "Payment load  successfully"
    })
}

exports.getOwnPaymentDetails = async (req, res, next) => {
    const payments = await Payment.find({ userID: req.user.id })
    res.status(200).json({
        success: true,
        payments,
        message: "Payment load  successfully"
    })
}