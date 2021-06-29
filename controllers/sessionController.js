const Session = require('../models/sessions');
const { addNotification, removeNotification, getNotification } = require('../utils/notificationManager');

//Create Session Praposal
exports.registerSessionPraposal = async (req, res, next) => {

    const { venue, time, date, email, phoneNumber, sessionPrice, name, flyer } = req.body;
    const praposeBy = req.user.id;
    const researcherName = req.user.fullName;

    const session = await Session.create({
        praposeBy,
        researcherName,
        sessionName: name,
        venue,
        time,
        date,
        email,
        phoneNumber,
        sessionPrice,
        flyer
    })

    addNotification('Your Session Request Praposal Added Successfully', req.user.id);

    res.status(200).json({
        success: true,
        session
    })
}

//Create Session
exports.registerSession = async (req, res, next) => {

    let sessionID = req.params.id
    const creatorID = req.user.id;
    const creatorName = req.user.fullName;

    let session = await Session.findById(sessionID);

    if (session.approvel.isApproved) {
        return res.status(403).json({
            success: false,
            message: 'This Session Already Approveed by Admin'
        })
    }


    session = await Session.updateOne({ _id: sessionID },
        { sessionCreate: { createBy: creatorID, createdDate: Date.now(), createrName: creatorName } }
        && { approvel: { isApproved: 1 } })

    session = await Session.findById(sessionID)

    addNotification('Your Session Request Praposal Added Successfully', session.praposeBy);

    res.status(200).json({
        success: true,
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

//Get All Sessions
exports.getAllSessions = async (req, res, next) => {

    let sessions = await Session.find();

    res.status(200).json({
        success: true,
        NumberOfSession: sessions.length,
        sessions
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

//Get Joined Sessions
exports.getAllJoinedSession = async (req, res, next) => {

    let userID = req.user.id
    let session = await Session.find({ "attendeeList.attendeeID": userID }).populate('User')

    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
        })
    }

    res.status(200).json({
        success: true,
        session
    })
}

//Left Joined Sessions
exports.leftJoinedSession = async (req, res, next) => {

    let userID = req.user.id
    let sessionID = req.params.id;
    let session = await Session.find({ _id: sessionID, "attendeeList.attendeeID": userID });

    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'You Are Not register For This Session',
        })
    }

    console.log('success');

    session = await Session.updateMany({ " _id": sessionID, $pull: { "attendeeList": { attendeeID: userID } } });

    res.status(200).json({
        success: true,
        session,
        message: 'Removed'
    })
}