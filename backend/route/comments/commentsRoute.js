const express = require('express');

const {
    commentCreateController,
    commentFetchAllController,
    commentFetchSingleController,
    commentUpdateController,
    commentDeleteController,
} = require('../../controllers/comments/commentsController');
const authMiddleWare = require("../../middlewares/auth/authMiddleware");

const commentRoutes = express.Router();


//api/comments
commentRoutes.get('/:id', authMiddleWare, commentFetchSingleController);
commentRoutes.put('/:id', authMiddleWare, commentUpdateController);
commentRoutes.delete('/:id', authMiddleWare, commentDeleteController);
commentRoutes.post('/', authMiddleWare, commentCreateController);
commentRoutes.get('/', commentFetchAllController);


module.exports = commentRoutes;