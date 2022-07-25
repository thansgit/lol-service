const express = require('express');
const authMiddleWare = require("../../middlewares/auth/authMiddleware");
const {messageNewController, messagesFetchController} = require('../../controllers/chat/chatMessageController');
const chatMessagesRoute = express.Router();

chatMessagesRoute.post('/', authMiddleWare, messageNewController);
chatMessagesRoute.get('/:conversationId', authMiddleWare, messagesFetchController);

module.exports = chatMessagesRoute;