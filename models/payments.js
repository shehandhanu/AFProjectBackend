const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const paymentSchema = mongoose.Schema({
    paymentDescription: {
        type: String,
        required: [true, 'Please Enter payment description']
    },
    amount:{
        type: String,
        required: [true, 'Please Enter amount']
    },
    userID:{
        type: mongoose.Schema.ObjectId,
        ref: 'userID',
        required: true
    },
    cardNumber: {
        type: Number,
        required: [true, 'Please Enter Card Number'],
        minLenght: [16, 'Card Number Must Be Longer 16 Charactors'],
        maxLenght: [16, 'Card number Con Not Exceed 16 Charactors']
    },
    cardName: {
        type: String,
        required: [true, 'Please Enter Card Name'],

    },
    cardCVV: {
        type: Number,
        required: [true, 'Please Enter CVV Number'],
            minLenght: [3, 'Card Number Must Be Longer 3 Charactors'],
            maxLenght: [3, 'Card number Con Not Exceed 3 Charactors']

    },
    cardExpireDate: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Payment', paymentSchema);