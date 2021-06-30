const { restart } = require('nodemon');
const Session = require('../models/sessions');
const sendToken = require('../utils/jwtToken');

exports.registersession = async (req, res, next) => {

    console.log(req.body)

    const { approvedDate, isApproved, approvedBy, venue, time, date, email, phonenumber,
        
    } = req.body;

    const session = await Session.create({
        approvedDate, 
        isApproved, 
        approvedBy, 
        venue, 
        time, 
        date, 
        email,
        phonenumber
        
        
    })

    res.status(200).json({
        success:true,
        session
    
    })

}

//Get Current session
exports.getsession = async (req, res, next) => {

    const session = await session.findById(req.params.id);

    if (!session) {
        return res.status(401).json({
            success: false,
            message: 'Session Not Found'
        })
    }

    res.status(200).json({
        success: true,
        session
    })
}




//Update User
exports.updatesession = async (req, res, next) => {

    let session = await session.findById(req.session.id);


    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found'
        })
    }

    session = await session.findByIdAndUpdate(req.session.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        session
    })
}

exports.savesession = async (req, res, next) =>{

    console.log(req.user.session);

    const {  approvedDate, isApproved, approvedBy, venue, time, date, email, phonenumber,} = req.body;

    const session = await session.create({
        sessionID: req.session.id,
        approvedDate, 
        isApproved, 
        approvedBy, 
        venue, 
        time, 
        date, 
        email,
        phonenumber
        

    })
    res.status(200).json({
        success: true,
        session,
        message: "Sessions added successfully"
    })
}

//Get Attendees For Sessions
exports.joinToSession = async (req, res, next) => {

    let sessionID = req.params.id;
    let userID = req.user.id
    let userName = req.user.fullName
    let session = await Session.findById(sessionID);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
        })
    }

    session = await Session.find({ _id: sessionID, "attendeeList.attendeeID": userID })

    if (!session.length == 0) {
        return res.status(201).json({
            success: false,
            message: 'You Are Already Register For This Session',
        })
    }

    session = await Session.updateOne({ _id: sessionID }, { $push: { attendeeList: [{ attendeeID: userID, attendeeName: userName }] } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    session = await Session.findById(sessionID);

    // addNotification(`Your Reasearch Publication Approve By Reviewer ${req.user.id}`, req.user.id);

    res.status(200).json({
        success: true,
        session
    })
}
