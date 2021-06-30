const Notification = require('../models/notifications');
const mongoose = require('mongoose')

//Check Notifications
const checkNotification = async (user) => {

    let notification = await Notification.find({ userID: user });

    if (notification.length == 0) {
        const notification = await Notification.create({
            userID: user,
            notification: []
        })
    }

}

//Add Notifications
exports.addNotification = async (message, user) => {

    await checkNotification(user)

    let uNotification = await Notification.find({ userID: user });

    message = {
        notificationTitle: message
    }

    notification = await Notification.findByIdAndUpdate({ _id: uNotification[0]._id }, { $push: { notifications: [message] } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });;
}

//Remove Notifications
exports.removeNotification = async (noID, user) => {

    var id = mongoose.Types.ObjectId(noID)

    let notification = await Notification.updateOne({ "notifications._id": id },
        { $set: { "notifications.$.isChecked": true } });

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification Not Found'
        })
    }

    console.log(notification)


    // notification = await Notification.findByIdAndUpdate({ _id: '60b26f7f3be7763098bc9d85' }, { $push: { notifications: [message] } }, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false
    // });;

}

//Check Notifications
exports.getNotification = async (user) => {

    let notification = await Notification.find({ userID: user });

    if (notification.length == 0) {
        return null
    }

    return notification

}