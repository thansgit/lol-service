
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

        socket.on('join_room', (data) => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`)
        });

        socket.on('send_message', (data) => {
            console.log(data);
            socket.to(data.room).emit('receive_message', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });
}

module.exports = socketIoConnect;