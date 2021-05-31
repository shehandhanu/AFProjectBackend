const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sessionSchema = mongoose.Schema({

    approvedDate: {
        type: Date,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    approvedBy: {
        type: String,
       // unique:true,
        //put user id
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    venue: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail]
    },
    phonenumber: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Session', sessionSchema);