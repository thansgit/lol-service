const express = require('express');
const {
    postCreateController,
    postFetchAllController,
    postFetchSingleController,
    postUpdateController,
    postDeleteController,
    postAddEmpathicVoteController,
    postAddEgoicVoteController,
} = require('../../controllers/posts/postsController');
const authMiddleWare = require("../../middlewares/auth/authMiddleware");
const { photoUploadMiddleware, postPhotoResizeMiddleware } = require("../../middlewares/upload/photoUploadMiddleware");
const postRoutes = express.Router();



//api/posts
postRoutes.post('/',
    authMiddleWare,
    photoUploadMiddleware.single('image'),
    postPhotoResizeMiddleware,
    postCreateController
);

postRoutes.put('/empathicvote', authMiddleWare, postAddEmpathicVoteController);

postRoutes.put('/egoicvote', authMiddleWare, postAddEgoicVoteController);

postRoutes.get('/', postFetchAllController,);

postRoutes.get('/:id', postFetchSingleController,);

postRoutes.put('/:id', authMiddleWare, postUpdateController,)

postRoutes.delete('/:id', authMiddleWare, postDeleteController)

module.exports = postRoutes;