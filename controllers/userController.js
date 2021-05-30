const User = require('../models/users');
const sendToken = require('../utils/jwtToken');
const { addNotification, removeNotification } = require('../utils/notificationManager');

//Genaral
//Show All Approved Research Papers
exports.getAllApprovedSessions = async (req, res, next) => {

    // const users = await User.find();

    // if (!users) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'No Any Users'
    //     });
    // }

    addNotification('Your Session Request Approve By Admin', req.user.id);


    res.status(200).json({
        success: true,
        message: 'All Sessions'
    })
}

//Show All Sessions Approved By Admin
exports.getAllApprovedResearchPapers = async (req, res, next) => {

    // const users = await User.find();

    // if (!users) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'No Any Users'
    //     });
    // }

    res.status(200).json({
        success: true,
        message: 'All Reseachs'
    })

}

//Registered User +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//User Registration
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

    const user = await User.findById(req.user.id);

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

//Mark As Read Notification
exports.notificationMarker = async (req, res, next) => {

    await removeNotification(req.params.id, req.user.id)

    res.status(200).json({
        success: true,
    })
}

//Admin +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Admin Get All Users
exports.getAllUsers = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })
}

//Get All Sessions
exports.getAllSessions = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })

}

//Get All Reasearch Papers
exports.getResearchPapers = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })

}

//Update User Type By Admin
exports.updateUserRole = async (req, res, next) => {

    let type = req.body.role
    let userID = req.body.userID

    let user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    user = await User.findByIdAndUpdate(userID, { role: type }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
}

//Approve Sessions By Admin
exports.approveSessions = async (req, res, next) => {

    let sessionID = req.parms.id
    let session = await Session.findById(sessionID);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
            session
        })
    }

    user = await User.findByIdAndUpdate(sessionID, { isApproveed: true }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    addNotification('Your Session Request Approve By Admin', req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}

