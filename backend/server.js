const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const { userRegisterController } = require ('./controllers/users/usersController')

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json())

//custom middleware
const logger = (req, res, next) => {
    console.log('I am a logger');
    next();
};

//2 usage.
app.use(logger);

//Register
app.post('/api/users/register', userRegisterController);

//Login
app.post('/api/users/login',(req,res)=>{
    //business logic
    res.json({user: 'User Login'})
});

//fetch all users
app.get('/api/users',(req,res)=>{
    res.json({user: 'fetch all users'})
});


//server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port: ${PORT}`));


// loluser - 3cfZCmuPiBh8pG3e