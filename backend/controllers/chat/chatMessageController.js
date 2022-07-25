const expressAsyncHandler = require("express-async-handler");
const Message = require("../../models/chat/Message");


//-------------------------------------------------------------------
//Send new message
//-------------------------------------------------------------------
const messageNewController = expressAsyncHandler(async (req, res) => {

    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (error) {
        res.json(error)
    }

});

//-------------------------------------------------------------------
//Get messages
//-------------------------------------------------------------------
const messagesFetchController = expressAsyncHandler(async (req, res) => {

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.json(messages);
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    messageNewController,
    messagesFetchController
}