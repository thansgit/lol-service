
const { Server } = require('socket.io')

const socketIoConnect = (server) => {
    io = new Server(server, {
        cors: {
            //Change to production server
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });


    let onlineUsers = [];

    //See if user does not exist in user array and append it
    const addUser = (userId, socketId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({ userId, socketId });
    };
    //Remove user from user array on disconnection
    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    };

    //Find user from onlineUsers array
    const findUser = (userId) => {
        return onlineUsers.find(user => user.userId === userId);
    };

    io.on("connection", (socket) => {
        //Take userId and socketId from user, send them to client to match userId with socketId
        //On connection
        console.log(`User connectd: ${socket.id}`);
        socket.on('addUser', userId => {
            addUser(userId, socket.id)
            io.emit('getUsers', onlineUsers)
        });

        //Send and get message
        socket.on('sendMessage', ({ senderId, receiverId, text }) => {
            const user = findUser(receiverId);
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text
            });
        });

        //On disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
            removeUser(socket.id);
            io.emit('getUsers', onlineUsers)
        });



    });
}

module.exports = socketIoConnect;