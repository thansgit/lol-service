const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Create schema

const userSchema = new mongoose.Schema({
    nickName: {
        required: [true, 'Nickname is required'],
        type: String,
    },
    profilePhoto: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2022/02/10/08/02/extraterrestrial-7004805__340.png',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        enum: ['Admin', 'Emotional slave', 'Obnoxious person', 'Emotionally liberated'],
    },
    isFollowing: {
        type: Boolean,
        default: false,
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
    },
    isAccountVerified:{
        type: Boolean,
        default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy:{
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: false,
    },
},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals: true,
    },
    timestamps: true,
});

//Hash password
userSchema.pre('save', async function(next){
    //Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//compile schema into model
const User = mongoose.model('User', userSchema);

module.exports = User;