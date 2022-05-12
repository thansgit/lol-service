const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/user/User');


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
    //check if user exists
    const user = await User.findOne({ email: req?.body?.email });
    if(!user){
        throw new Error(`Login credentials invalid`);
    }
    res.json('User succesfully logged in');
});

module.exports = { userRegisterController, userLoginController}