const User = require('../models/users');
const sendToken = require('../utils/jwtToken');

exports.registerUser = async (req, res, next) => {

    const { firstName, lastName, fullName, birthday, email, password, public_id, url, role,
        profileCreatedAt, contactNumber, gender, street1, street2, city, zipCode, country, highestEducation, certifiedDate,
        institued, cardNumber, cardName, cardCVV, cardExpireDate,
    } = req.body;

    const user = await User.create({
        name: {
            firstName,
            lastName
        },
        fullName,
        birthday,
        email,
        password,
        profilePicture: {
            public_id,
            url
        },
        role,
        profileCreatedAt,
        contactNumber,
        gender,
        address: {
            street1,
            street2,
            city,
            zipCode,
            country
        },
        education: {
            highestEducation,
            certifiedDate,
            institued
        },
        paymentDetails: {
            cardNumber,
            cardName,
            cardCVV,
            cardExpireDate
        }
    })

    sendToken(user, 200, res);

}

//Get Current User
exports.getUserProfile = async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User Not Found'
        })
    }

    res.status(200).json({
        success: true,
        user
    })
}


//User Login
exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    //Check Entered Email And Password Are Empty
    if (!email || !password) {
        return res.status(204).json({
            success: false,
            message: 'Email Or Password Empty'
        })
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User No Found'
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Email Or Password'
        })
    }

    sendToken(user, 200, res);

}

//Logout User
exports.logoutUser = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })

}

//Update User
exports.updateUser = async (req, res, next) => {

    let user = await User.findById(req.user.id);


    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
}

