const express = require('express');
const {
    chatNewController,
    chatGetController
} = require("../../controllers/chat/chatController");
const authMiddleWare = require("../../middlewares/auth/authMiddleware");

const chatsRoutes = express.Router();

chatsRoutes.post('/', authMiddleWare, chatNewController);
chatsRoutes.get('/:userId', authMiddleWare, chatGetController);



module.exports = chatsRoutes;
