const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
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
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy: {
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
    passwordResetTokenExpires: Date,
    active: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

//Virtual(not stored in db) to populate user created posts
userSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id', 
})

//Account type:
userSchema.virtual('accountType').get(function(){
    const totalFollowers = this.followers?.length;
    return totalFollowers >= 1 ? 'Emotionally liberated' : 'Obnoxious person'
})

//Hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Verify account
userSchema.methods.createAccountVerificationToken = async function () {
    //Create a token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.accountVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes

    return verificationToken;
};

//Password reset
userSchema.methods.createPasswordResetToken = async function () {
    //Create a token
    const passwordResetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(passwordResetToken)
        .digest('hex');

    this.passwordResetTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes

    return passwordResetToken;
};

//Compile schema into model
const User = mongoose.model('User', userSchema);

module.exports = User;