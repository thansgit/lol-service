const expressAsyncHandler = require('express-async-handler');

const sgMail = require('@sendgrid/mail');
const emailMessage = require("../../models/emailMessaging/emailMessaging");


const sendEmailController = expressAsyncHandler(async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        //Build message
        const msg = {
            to,
            from: 'lol-system@tutanota.com',        //Maybe change to sendgrid account
            subject,
            text: message,
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