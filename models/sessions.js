const mongoose = require('mongoose');
const validator = require('validator');

const sessionSchema = mongoose.Schema({

    praposeBy: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    researcherName: {
        type: String,
        required: true
    },
    sessionName: {
        type: String,
        required: true
    },
    sessionCreate: {
        createBy: {
            type: mongoose.Schema.ObjectId,
            default: null
        },
        createrName: {
            type: String,
            default: null
        },
        createdDate: {
            type: Date,
            default: null
        },
    },
    approvel: {
        approvedDate: {
            type: Date,
            default: null
        },
        isApproved: {
            type: Number,
            default: 0
        },
        approvedBy: {
            type: mongoose.Schema.ObjectId,
            default: null
        }
    },
    praposeDate: {
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
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail]
    },
    phoneNumber: {
        type: String,
        required: true
    },
    flyer: {
        type: String,
        required: true
    },
    sessionPrice: {
        type: Number,
        required: true
    },
    attendeeList: [
        {
            attendeeID: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: 'User',
            },
            attendeeName: {
                type: String,
                required: true
            },
            paymentStatus: {
                type: Boolean,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Session', sessionSchema);