const express = require('express');

const { sendEmailController } = require('../../controllers/emails/emailController');
const authMiddleWare = require("../../middlewares/auth/authMiddleware");

const emailRoutes = express.Router();

//api/email

emailRoutes.post('/', authMiddleWare, sendEmailController);

module.exports = emailRoutes;