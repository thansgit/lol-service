const express = require('express');
const { userRegisterController, userLoginController } = require("../../controllers/users/usersController");


const userRoutes = express.Router();

userRoutes.post('/register', userRegisterController);
userRoutes.post('/login', userLoginController);

module.exports = userRoutes;