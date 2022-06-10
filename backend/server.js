const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();
const dbConnect = require('./config/db/dbConnect');

const userRoutes = require('./route/users/usersRoute');
const postRoutes = require('./route/posts/postsRoute');
const commentRoutes = require('./route/comments/commentsRoute');
const emailRoutes = require('./route/emails/emailsRoute');
const categoriesRoute = require("./route/categories/categoriesRoute");

const { errorHandler, notFound, multerErrorDebugger } = require('./middlewares/error/errorHandler');

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());

//Cors
app.use(cors());

//Users route
app.use('/api/users', userRoutes);

//Posts route
app.use('/api/posts', postRoutes);

//Comments route
app.use('/api/comments', commentRoutes);

//Emails route
app.use('/api/email', emailRoutes);

//Categories route
app.use('/api/categories', categoriesRoute)

//Err handling
//app.use(multerErrorDebugger);
app.use(notFound);  //Passes notfound error to errorhandler
app.use(errorHandler);


//server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
