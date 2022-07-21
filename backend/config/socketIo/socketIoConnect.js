
const { Server } = require('socket.io')



const socketIoConnect = (server) => {
    console.log(server)
    io = new Server(server, {
        cors: {
            //Change to production server
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connectd: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });
}

module.exports = socketIoConnect;