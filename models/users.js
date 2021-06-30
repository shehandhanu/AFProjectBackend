const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    name: {
        firstName: {
            type: String,
            required: [true, 'Please Enter User First Name'],
            maxLength: [50, 'User First Name Cannot Exceed 50 Characters']
        },
        lastName: {
            type: String,
            required: [true, 'Please Enter User Last Name'],
            maxLength: [50, 'User Last Name Cannot Exceed 50 Characters']
        }
    },
    fullName: {
        type: String,
        required: [true, 'Please Enter Full Name'],
        maxLength: [150, 'User Full Name Can not Exceed 150 Characters']
    },
    birthday: {
        type: Date,
        required: [true, 'Please Enter Birthday']
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minLenght: [8, 'Your Password Must Be Longer Than 6 Characters'],
        maxLength: [20, 'User Full Name Can not Exceed 20 Characters'],
        select: false
    },
    profilePicture: {
        url: {
            type: String,
            required: [true, 'Please Add Profile Picture']
        }
    },
    role: {
        type: String,
        default: 'attentdee'
    },
    profileCreatedAt: {
        type: Date,
        default: Date.now()
    },
    contactNumber: {
        type: String,
        required: [true, 'Please Enter Your Phone Number']
    },
    address: {
        street1: {
            type: String,
            maxLength: [50, 'User Address street1 Can not Exceed 50 Characters']
        },
        street2: {
            type: String,
            maxLength: [50, 'User Address street2 Can not Exceed 50 Characters']
        },
        city: {
            type: String,
            maxLength: [50, 'User Address city Can not Exceed 50 Characters']
        },
        zipCode: {
            type: String,
            maxLength: [50, 'User Address zipCode Can not Exceed 50 Characters']
        },
        country: {
            type: String,
            maxLength: [50, 'User Address country Can not Exceed 50 Characters']
        }
    },
    education: {
        highestEducation: {
            type: String,
            required: [true, 'Please Enter Your Highest Education Qulificatoin']
        },
        certifiedDate: {
            type: Date,
            required: [true, 'Please Enter Certified Date']
        },
        institued: {
            type: String,
            required: [true, 'Please Enter Institued']
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//Encrypt Password Before Saving User
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);

})
//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return Json Web Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

module.exports = mongoose.model('User', userSchema);