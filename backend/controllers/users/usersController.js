const expressAsyncHandler = require('express-async-handler');
const sendGridMail = require('@sendgrid/mail');
const crypto = require('crypto');
const fs = require('fs');
const generateToken = require("../../config/token/generateToken");
const User = require('../../models/user/User');
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImage = require("../../utils/cloudinary");


sendGridMail.setApiKey(process.env.SEND_GRID_API_KEY);


//-------------------------------------------------------------------
//Register
//-------------------------------------------------------------------
const userRegisterController = expressAsyncHandler(async (req, res) => {

    //Check if user exists
    const userExists = await User.findOne({ email: req?.body?.email });
    if (userExists) throw new Error('User already exists');

    try {
        //Register user
        const user = await User.create({
            nickName: req?.body?.nickName,
            email: req?.body?.email,
            password: req?.body?.password,
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    };
});


//-------------------------------------------------------------------
//Login user
//-------------------------------------------------------------------
const userLoginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Check if user exists
    const userFound = await User.findOne({ email });
    //Check if password is a match
    if (userFound && await userFound.isPasswordMatched(password)) {
        res.json({
            _id: userFound?.id,
            nickName: userFound?.nickName,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id), //Generate JWT token for user
            isAccountVerified: userFound?.isAccountVerified,
        });
    } else {
        res.status(401);
        throw new Error('Invalid login credentials');
    }
});

//-------------------------------------------------------------------
//Fetch all users
//-------------------------------------------------------------------
const usersFetchController = expressAsyncHandler(async (req, res) => {
    console.log(req.headers)
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Delete user
//-------------------------------------------------------------------
const userDeleteController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //Check if user id is valid
    validateMongodbID(id);
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//User details
//-------------------------------------------------------------------
const userFetchDetailsController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //Check if user id is valid
    validateMongodbID(id);

    try {
        const user = await User.findById(id).populate('posts');
        res.send(json(user));
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//User profile
//-------------------------------------------------------------------
const userProfileController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const myProfile = await User.findById(id).populate('posts');
        res.json(myProfile);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Update profile
//-------------------------------------------------------------------
const userUpdateController = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    validateMongodbID(_id);

    const user = await User.findByIdAndUpdate(_id, {
        nickName: req?.body?.nickName,
        email: req?.body?.email,
        bio: req?.body?.bio,
    }, {
        new: true,
        runValidators: true,
    });
    res.json(user);
});

//-------------------------------------------------------------------
//Update profile password
//-------------------------------------------------------------------
const userUpdatePasswordController = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbID(_id);

    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    res.json(user);
});

//-------------------------------------------------------------------
//Following
//-------------------------------------------------------------------
const userFollowingController = expressAsyncHandler(async (req, res) => {


    const { followId } = req.body;
    const loginUserId = req.user.id;


    //Find the target user and check if the login id exists
    const targetUser = await User.findById(followId);
    const alreadyFollowing = targetUser?.followers?.find(
        user => user?.toString() === loginUserId.toString()
    );

    if (alreadyFollowing) throw new Error('You are already following this user');

    //1. Find the user you want to follow and update it's followers field
    await User.findByIdAndUpdate(
        followId,
        {
            $push: { followers: loginUserId },
            isFollowing: true,
        }
        , { new: true }
    );

    //2. Update the login user following field
    await User.findByIdAndUpdate(
        loginUserId,
        {
            $push: { following: followId }
        },
        { new: true }
    );
    res.json('You have succesfully followed this user');
});

//-------------------------------------------------------------------
//Unfollowing
//-------------------------------------------------------------------
const userUnfollowingController = expressAsyncHandler(async (req, res) => {
    const { unFollowId } = req.body;
    const loginUserId = req.user.id;

    await User.findByIdAndUpdate(
        unFollowId,
        {
            $pull: { followers: loginUserId },
            isFollowing: false,
        },
        { new: true }
        );

    await User.findByIdAndUpdate(
        loginUserId,
        {
            $pull: { following: unFollowId },
        },
        { new: true }
    );

    res.json('You have succesfully unfollowed this user');
});
//-------------------------------------------------------------------
//Block user
//-------------------------------------------------------------------
const userBlockController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: true,
    }, { new: true });

    res.json(user);
});

//-------------------------------------------------------------------
//Unblock user
//-------------------------------------------------------------------
const userUnBlockController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: false,
    }, { new: true });

    res.json(user);
});

//-------------------------------------------------------------------
//Generate email verification token
//-------------------------------------------------------------------
const userVerificationTokenGeneratorController = expressAsyncHandler(async (req, res) => {
    const loginUserId = req.user.id;
    const user = await User.findById(loginUserId);

    try {
        //Generate token
        const verificationToken = await user?.createAccountVerificationToken();
        const verificationLink = `http://localhost:3000/verify-account/${verificationToken}`
        //Save the user with the token to database
        await user.save();
        //Build email
        const resetURL = `If you requested to verify your account, verify within 10 minutes. Otherwise, ignore this message.
        ${verificationLink} Navigate to verify`
        const msg = {
            to: user?.email,
            from: 'lol-system@tutanota.com',
            subject: 'Verify your account',
            content: [
                {
                  "type": "text/html", 
                  "value": `<html><head>Verification</head><body>${resetURL}c</body></html>`
                }
              ], 
        };

        await sendGridMail.send(msg);
        res.json(resetURL);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Account verification
//-------------------------------------------------------------------
const userAccountVerificationController = expressAsyncHandler(async (req, res) => {
    const { token } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    //Find the user by token
    const userFound = await User.findOne({
        accountVerificationToken: hashedToken,
        accountVerificationTokenExpires: { $gt: new Date() } //greater than 
    });

    if (!userFound) throw new Error('Token expired, try again later');

    //Update the properties
    userFound.isAccountVerified = true
    userFound.accountVerificationToken = undefined;
    userFound.accountVerificationTokenExpires = undefined;

    await userFound.save();

    res.json(userFound);

});

//-------------------------------------------------------------------
//Forgot password token generator
//-------------------------------------------------------------------
const userForgotPasswordTokenGeneratorController = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    //Find the user by email address
    const userFound = await User.findOne({ email });
    if (!userFound) throw new Error('User not found')


    try {
        const passwordResetToken = await userFound.createPasswordResetToken();
        await userFound.save();

        //Build message
        const resetURL = `If you requested to reset your password, reset within 10 minutes. Otherwise, ignore this message.
        <a href='http://localhost:3000/reset-password/${passwordResetToken}'>Click to reset</a>`
        const msg = {
            to: email,
            from: 'lol-system@tutanota.com',
            subject: 'Reset LoL-service password',
            html: resetURL,
        };

        // await sendGridMail.send(msg);
        res.json({
            msg: `A verification message sent to ${userFound?.email}. Reset within 10 minutes, ${resetURL}`
        });
    } catch (error) {
        res.json(error);
    }

});

//-------------------------------------------------------------------
//Password reset
//-------------------------------------------------------------------
const userPasswordResetController = expressAsyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    //Find user by token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error('Token expired, try again later');

    //Change the password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    res.json(user);
});

//-------------------------------------------------------------------
//Profile photo upload
//-------------------------------------------------------------------
const userProfilePhotoUploadController = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    //1. Get the path to the image
    const localPath = `public/images/profile/${req.file.filename}`;
    //2. Upload to cloudinary
    const uploadedImg = await cloudinaryUploadImage(localPath);

    //Find the logged in user and update profilephoto
    const foundUser = await User.findByIdAndUpdate(_id, {
        profilePhoto: uploadedImg?.url
    }, { new: true });

    //Remove local copies of uploaded imgs
    fs.unlinkSync(localPath);

    res.json(foundUser);
});

module.exports = {
    userRegisterController,
    userLoginController,
    usersFetchController,
    userDeleteController,
    userFetchDetailsController,
    userProfileController,
    userUpdateController,
    userUpdatePasswordController,
    userFollowingController,
    userUnfollowingController,
    userBlockController,
    userUnBlockController,
    userVerificationTokenGeneratorController,
    userAccountVerificationController,
    userForgotPasswordTokenGeneratorController,
    userPasswordResetController,
    userProfilePhotoUploadController,
}