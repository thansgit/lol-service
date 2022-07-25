const http = require('http');
const dotenv = require("dotenv");
const cors = require('cors');
const express = require("express");
dotenv.config();
const dbConnect = require('./config/db/dbConnect');
const socketIoConfig = require('./config/socketIo/socketIoConfig');

const userRoutes = require('./route/users/usersRoute');
const postRoutes = require('./route/posts/postsRoute');
const commentRoutes = require('./route/comments/commentsRoute');
const emailRoutes = require('./route/emails/emailsRoute');
const categoriesRoute = require("./route/categories/categoriesRoute");
const chatsRoutes = require('./route/chat/chatsRoute');
const chatMessagesRoute = require('./route/chat/chatMessagesRoute');

const { errorHandler, notFound, multerErrorDebugger } = require('./middlewares/error/errorHandler');

const app = express();


//Cors
app.use(cors());

//DB
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use('/api/users', userRoutes);

//Posts route
app.use('/api/posts', postRoutes);

//Comments route
app.use('/api/comments', commentRoutes);

//Emails route
app.use('/api/email', emailRoutes);

//Categories route
app.use('/api/categories', categoriesRoute);

//Chat route
app.use('/api/chat', chatsRoutes);
app.use('/api/chatmessage', chatMessagesRoute);

//Socket
//Err handling
//app.use(multerErrorDebugger);
app.use(notFound);  //Passes notfound error to errorhandler
app.use(errorHandler);

//Servers
const server = http.createServer(app);
socketIoConfig(server)

const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`Server is running on port: ${PORT}`));


