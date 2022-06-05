const expressAsyncHandler = require('express-async-handler');

const sgMail = require('@sendgrid/mail');
const emailMessage = require("../../models/emailMessaging/emailMessaging");


const sendEmailController = expressAsyncHandler(async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        //Build message
        const msg = {
            to,
            subject,
            text: message,
            from: 'lol-system@tutanota.com'        //Maybe change to sendgrid account
        };
        //Send message
        await sgMail.send(msg);
        //Save to db
        await emailMessage.create({
            sentBy: req?.user?._id,
            from: req?.user?.email,
            to,
            message,
            subject
        });

        res.json('Mail sent');
    } catch (error) {
        res.json(error);
    }
});

module.exports = { sendEmailController }