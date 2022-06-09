const expressAsyncHandler = require('express-async-handler');
const Post = require('../../models/post/Post');
const fs = require('fs');
const User = require("../../models/user/User");
const cloudinaryUploadImage = require("../../utils/cloudinary");
const validateMongodbID = require("../../utils/validateMongodbID");

//-------------------------------------------------------------------
//Create post
//-------------------------------------------------------------------
const postCreateController = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbID(_id);

    //1. Get the path to the image
    //const localPath = `public/images/post/${req.file.filename}`;
    //2. Upload to cloudinary
    //const uploadedImg = await cloudinaryUploadImage(localPath);

    //Maybe profane word filter for have to etc..
    try {
        const post = await Post.create({
            ...req.body,
            //image: uploadedImg?.url,
            user: _id,
        });
        res.json(post);

        //Remove local copies of uploaded imgs
        //fs.unlinkSync(localPath);
    } catch (error) {
        res.json(error);
    }
});


//-------------------------------------------------------------------
//Fetch all posts
//-------------------------------------------------------------------
const postFetchAllController = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user');
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Fetch a single post
//-------------------------------------------------------------------
const postFetchSingleController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    try {
        const post = await Post.findById(id)
            .populate('user')
            .populate('egoicVotes')
            .populate('empathicVotes');
        //Update number of views
        await Post.findByIdAndUpdate(id, {
            $inc: { numOfViews: 1 }
        },
            { new: true }
        );
        res.json(post)
    } catch (error) {
        res.json(error);
    }

});

//-------------------------------------------------------------------
//Update post
//-------------------------------------------------------------------
const postUpdateController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const post = await Post.findByIdAndUpdate(id, {
            ...req.body,
            user: req.user?._id,
        },
            { new: true, }
        );
        res.json(post);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Delete post
//-------------------------------------------------------------------
const postDeleteController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const post = await Post.findByIdAndDelete(id)
        res.json(post);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Empathic vote
//-------------------------------------------------------------------
const postAddEmpathicVoteController = expressAsyncHandler(async (req, res) => {
    //1. Find the post to be voted
    const { postId } = req.body;
    const post = await Post.findById(postId);
    //2.Find the logged in user
    const loggedUserId = req?.user?._id;
    //3. Check if this user has voted empathically on this post
    const votedEmpathically = post?.isEmpathic;
    //4. Check if this user has already voted egoically on this post
    const alreadyVotedEgoic = post?.egoicVotes?.find(userId => userId?.toString() === loggedUserId?.toString())

    //Remove the user from egoicVotes array if has voted egoically on post
    if (alreadyVotedEgoic) {
        const post = await Post.findByIdAndUpdate(postId, {
            $pull: { egoicVotes: loggedUserId },
            isEgoic: false,
        }, { new: true }
        );
        res.json(post);
    }
    //Remove the user from empathicVotes array if has voted empathically on post
    if (votedEmpathically) {
        const post = await Post.findByIdAndUpdate(postId, {
            $pull: { empathicVotes: loggedUserId },
            isEmpathic: false,
        }, { new: true });
        res.json(post);
    } else {
        //Add to empathicVotes
        const post = await Post.findByIdAndUpdate(postId, {
            $push: { empathicVotes: loggedUserId },
            isEmpathic: true,
        }, { new: true });
        res.json(post);
    }
});

//-------------------------------------------------------------------
//Egoic vote
//-------------------------------------------------------------------
const postAddEgoicVoteController = expressAsyncHandler(async (req, res) => {
    //Find the post to be voted
    const { postId } = req.body;
    const post = await Post.findById(postId);
    //Find the logged in user
    const loggedUserId = req?.user?._id;
    //3. Check if this user has voted egoic on this post
    const votedEgoic = post?.isEgoic;
    //4. Check if this user has already voted empathic on this post
    const alreadyVotedEmpathic = post?.empathicVotes?.find(userId => userId?.toString() === loggedUserId?.toString());
    //Remove the user from empathicVotes array if has voted egoically on post
    if (alreadyVotedEmpathic) {
        const post = await Post.findByIdAndUpdate(postId, {
            $pull: { empathicVotes: loggedUserId },
            isEmpathic: false,
        }, { new: true }
        );
        res.json(post);
    }

    //Remove the user from egoicVotes array if has voted egoic on post
    if (votedEgoic) {
        const post = await Post.findByIdAndUpdate(postId, {
            $pull: { egoicVotes: loggedUserId },
            isEgoic: false,
        }, { new: true });
        res.json(post);
    } else {
        //Add to egoicVotes
        const post = await Post.findByIdAndUpdate(postId, {
            $push: { egoicVotes: loggedUserId },
            isEgoic: true,
        }, { new: true });
        res.json(post);
    }

});

module.exports = {
    postCreateController,
    postFetchAllController,
    postFetchSingleController,
    postUpdateController,
    postDeleteController,
    postAddEmpathicVoteController,
    postAddEgoicVoteController,
}