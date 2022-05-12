const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use('/api/users', userRoutes);

//Err handling
app.use(notFound);  //Passes notfound error to errorhandler
app.use(errorHandler);


//server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
