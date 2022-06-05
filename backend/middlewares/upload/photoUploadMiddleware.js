const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

//Storage
const multerStorage = multer.memoryStorage();

//File type checking
const multerFilter = (req, file, callback) => {
    //Check file type
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        //Rejected files
        callback({
            message: 'Unsupported file format',
        },
            false);
    }
};

const photoUploadMiddleware = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 }, //1MB
});


//Profile img resizing
const profilePhotoResizeMiddleware = async (req, res, next) => {
    //Check if there is no file
    if (!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(path.join(`public/images/profile/${req.file.filename}`)); //250px, 250px

    next();
};
//Post img resizing
const postPhotoResizeMiddleware = async (req, res, next) => {
    //Check if there is no file
    if (!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(path.join(`public/images/post/${req.file.filename}`)); //250px, 250px

    next();
};

module.exports = { photoUploadMiddleware, profilePhotoResizeMiddleware, postPhotoResizeMiddleware }