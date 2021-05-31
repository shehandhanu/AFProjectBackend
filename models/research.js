const mongoose = require('mongoose');

const researchSchema = mongoose.Schema({

    contactInfo:{
        phoneNo:{
            type: String,
            requied: [true, 'Please Enter Your Phone Number'],
            unique: true,
            maxLength: [15, 'Phone Number Can not Exceed 15 Characters']
        },
        email:{
            type: String,
            requied: [true, 'Please Enter Your Email'],
            unique: true,
            maxLength: [30, 'Email Can not Exceed 30 Characters']
        }
    },
    title:{
        type: String,
        requied: [true, 'Please Enter The Title That You Want']
    },
    description:{
        type: String,
        requied: [true, 'Please Enter The Description']
    },
    tag:{
        type: String,
        requied: [true, 'Please Enter The Tag That You Want']
    },
    uploadDate:{
        type: Date,
        default: Date.now()
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    approvedBy:{
        type: String,
        requied: [true, 'Select The Approved Person']
    },
    approvedDate:{
        type: Date,
        requied: [true, 'Select The Approved Date']
    }
})

module.exports = mongoose.model('Research', researchSchema);