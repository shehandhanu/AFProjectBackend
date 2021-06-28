const nodemailer = require("nodemailer");

const sendMail = async (type, data) => {

    //Type 1 is to Join Session Notifications 
    //Type 2 is to Publication Approvel
    //Type 3 is to Make A sesion and request to approvel
    //Typr 4 is to requested session createed and approveed

    var sendEmail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        }
    });

    switch (type) {
        case 1:
            {
                var mailOption = {
                    from: 'blackcodeteam1st@gmail.com',
                    to: data.email,
                    subject: `About Join To Requested Session (${sessionName})`,
                    // text: `Thank You Your order number is ${order[0].cartID} We have emailed your order confirmation, and will send you an update when your order has shipped.`,
                    // attachments: {
                    //     filename: 'invoice.pdf',
                    //     path: "./invoice.pdf"
                    // }
                }
            }
            break;
        case 2:
            {
                var mailOption = {
                    from: 'blackcodeteam1st@gmail.com',
                    to: data.email,
                    subject: `Your Submitted Research Paper Are Approved`,
                    // text: `Thank You Your order number is ${order[0].cartID} We have emailed your order confirmation, and will send you an update when your order has shipped.`,
                    // attachments: {
                    //     filename: 'invoice.pdf',
                    //     path: "./invoice.pdf"
                    // }
                }
            }
            break;
        case 3:
            {
                var mailOption = {
                    from: 'blackcodeteam1st@gmail.com',
                    to: data.email,
                    subject: `About Your Request To Make A Session ${data.sessionName}`,
                    // text: `Thank You Your order number is ${order[0].cartID} We have emailed your order confirmation, and will send you an update when your order has shipped.`,
                    // attachments: {
                    //     filename: 'invoice.pdf',
                    //     path: "./invoice.pdf"
                    // }
                }
            }
            break;
        case 4:
            {
                var mailOption = {
                    from: 'blackcodeteam1st@gmail.com',
                    to: data.email,
                    subject: `Your Requested Session Has Approved By Admin`,
                    // text: `Thank You Your order number is ${order[0].cartID} We have emailed your order confirmation, and will send you an update when your order has shipped.`,
                    // attachments: {
                    //     filename: 'invoice.pdf',
                    //     path: "./invoice.pdf"
                    // }
                }
            }
            break;
        default:
            break;
    }

    sendEmail.sendMail(mailOption, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log(`Email Sent to ${user.email}`);
        }

    })

}

module.exports = sendMail;