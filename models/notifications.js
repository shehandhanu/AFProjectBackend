const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({

    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserID',
        required: true
    },
    notifications: [
        {
            notificationTitle: {
                type: String,
                required: [true, 'Please Enter Notification Title']
            },
            isChecked: {
                type: Boolean,
                default: false
            }
        }
    ]

})

module.exports = mongoose.model('Notification', notificationSchema);