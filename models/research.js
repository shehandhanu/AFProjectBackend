const mongoose = require('mongoose');

const researchSchema = mongoose.Schema({

    contactInfo: {
        UserID: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        phoneNo: {
            type: String,
            requied: [true, 'Please Enter Your Phone Number'],
            maxLength: [15, 'Phone Number Can not Exceed 15 Characters']
        },
        email: {
            type: String,
            requied: [true, 'Please Enter Your Email'],
            maxLength: [30, 'Email Can not Exceed 30 Characters']
        }
    },
    title: {
        type: String,
        required: [true, 'Please Enter The Title That You Want']
    },
    description: {
        type: String,
        required: [true, 'Please Enter The Description']
    },
    tag: {
        type: String,
        required: [true, 'Please Enter The Tag That You Want']
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    },
    document: {
        type: String,
        required: [true, 'Please Add The File']
    },
    coverPage: {
        type: String,
        required: [true, 'Please Add Cover Page']
    },
    isApproved: {
        type: Number,
        default: 1
    },
    approvedBy: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    approvedDate: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Research', researchSchema);