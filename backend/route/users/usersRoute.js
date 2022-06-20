const express = require('express');
const {
    userRegisterController,
    userLoginController,
    usersFetchController,
    userProfileController,
    userUpdateController,
    userUpdatePasswordController,
    userFollowingController,
    userUnfollowingController,
    userDeleteController,
    userFetchDetailsController,
    userBlockController,
    userUnBlockController,
    userVerificationTokenGeneratorController,
    userAccountVerificationController,
    userForgotPasswordTokenGeneratorController,
    userPasswordResetController,
    userProfilePhotoUploadController,
} = require("../../controllers/users/usersController");
const authMiddleWare = require("../../middlewares/auth/authMiddleware");
const { 
    photoUploadMiddleware,
     profilePhotoResizeMiddleware, 
    } = require("../../middlewares/upload/photoUploadMiddleware");
const userRoutes = express.Router();

//api/users
userRoutes.put('/profilephoto-upload',
    authMiddleWare,
    photoUploadMiddleware.single('image'),
    profilePhotoResizeMiddleware,
    userProfilePhotoUploadController
    );

userRoutes.get('/profile/:id', authMiddleWare, userProfileController);

userRoutes.put('/follow', authMiddleWare, userFollowingController);

userRoutes.post('/generate-verify-email-token', authMiddleWare, userVerificationTokenGeneratorController);

userRoutes.put('/verify-account', authMiddleWare, userAccountVerificationController);

userRoutes.put('/unfollow', authMiddleWare, userUnfollowingController);

userRoutes.put('/block-user/:id', authMiddleWare, userBlockController);

userRoutes.put('/unblock-user/:id', authMiddleWare, userUnBlockController);

userRoutes.post('/register', userRegisterController);

userRoutes.post('/login', userLoginController);

userRoutes.post('/forgot-password-token', userForgotPasswordTokenGeneratorController);

userRoutes.put('/reset-password', userPasswordResetController);

userRoutes.put('/password', authMiddleWare, userUpdatePasswordController);

userRoutes.put('/', authMiddleWare, userUpdateController);

userRoutes.delete('/:id', userDeleteController);

userRoutes.get('/:id', userFetchDetailsController);

userRoutes.get('/', authMiddleWare, usersFetchController);



module.exports = userRoutes;