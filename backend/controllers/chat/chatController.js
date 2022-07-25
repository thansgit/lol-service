const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../models/chat/Chat");


//-------------------------------------------------------------------
//Start new chat
//-------------------------------------------------------------------
const chatNewController = expressAsyncHandler(async (req, res) => {
    const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (error) {
        res.json(error);
    }

});


//-------------------------------------------------------------------
//Get users chats
//-------------------------------------------------------------------
const chatGetController = expressAsyncHandler(async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in:[req.params.userId] }
        });
        res.json(chat)
    } catch (error) {
        res.json(error);
    }
});



module.exports = {
    chatNewController,
    chatGetController
}