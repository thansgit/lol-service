const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/Comment");
const checkIfUserBlockedError = require("../../utils/checkIfUserBlockedError");
const validateMongodbID = require("../../utils/validateMongodbID");


//-------------------------------------------------------------------
//Create comment
//-------------------------------------------------------------------
const commentCreateController = expressAsyncHandler(async (req, res) => {
    //1. Get the user, because of authmiddleware we have req.user
    const user = req.user;

    //Check if user is blocked
    checkIfUserBlockedError(user);

    //2. Get the post id and description
    const { postId, description } = req.body;

    try {
        const comment = await Comment.create({
            post: postId,
            user: user,
            description: description
        })
        res.json(comment);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Fetch all comments
//-------------------------------------------------------------------
const commentFetchAllController = expressAsyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({}).sort('-created');
        res.json(comments);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Fetch a single comment
//-------------------------------------------------------------------
const commentFetchSingleController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    try {
        const comment = await Comment.findById(id);
        res.json(comment);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Update a comment
//-------------------------------------------------------------------
const commentUpdateController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    try {
        const update = await Comment.findByIdAndUpdate(id, {
            user: req?.user,
            description: req?.body.description
        },
            { 
                new: true,
                runValidators: true,
             }
        )
        res.json(update);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Delete a comment
//-------------------------------------------------------------------
const commentDeleteController = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbID(id);

    try {
        const comment = await Comment.findByIdAndDelete(id);
        res.json(comment);
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    commentCreateController,
    commentFetchAllController,
    commentFetchSingleController,
    commentUpdateController,
    commentDeleteController,
}