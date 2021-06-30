const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const paymentSchema = mongoose.Schema({
    paymentDescription: {
        type: String,
        required: [true, 'Please Enter payment description']
    },
    amount: {
        type: Number,
        required: [true, 'Please Enter amount']
    },
    paymentType: {
        type: String,
        required: true,
    },
    paymentTypeID: {
        type: mongoose.Schema.ObjectId,
        ref: 'paymentTypeID',
        required: true
    },
    userID: {
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


//Encrypt Password Before Saving User
paymentSchema.pre('save', async function (next) {

    if (!this.isModified('cardNumber')) {
        next()
    } else {
        this.password = await bcrypt.hash(this.cardNumber, 10);
    }

    // if (!this.isModified('cardCVV')) {
    //     next()
    // } else {
    //     this.password = await bcrypt.hash(this.cardCVV, 10);
    // }

    // if (!this.isModified('cardExpireDate')) {
    //     next()
    // } else {
    //     this.password = await bcrypt.hash(this.cardExpireDate, 10);
    // }

})

//Compare Password
paymentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Payment', paymentSchema);