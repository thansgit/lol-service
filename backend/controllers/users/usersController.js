const User = require('../../models/user/User');

//Register
const userRegisterController = async (req, res) => {

    console.log(req.body)

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
    }
}

module.exports = { userRegisterController, }