const mongoose = require ('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Post category is required'],
    },
    numOfViews:{
        type: Number,
        default: 0,
    },
    isEmpathic: {
        type: Boolean,
        default: false,
    },
    isEgoic: {
        type: Boolean,
        default: false,
    },
    empathicVotes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    egoicVotes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    description: {
        type: String,
        required: [true, 'Post description is required'],
    },
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/01/06/22/24/giraffe-1959110_960_720.jpg',
    }, 

}, {
    toJSON:{
        virtuals: true //Virtuals are values not stored in DB
    },
    toObject: {
        virtuals: true
    },
    timestamps: true,
});
//Populate with comments
postSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField:'_id',
});

//Compile schema into model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;