const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/category/Category");
const validateMongodbID = require("../../utils/validateMongodbID");



//-------------------------------------------------------------------
//Create category
//-------------------------------------------------------------------
const categoryCreateController = expressAsyncHandler(async (req, res) => {

    try {
        const category = await Category.create({
            user: req.user._id,
            title: req.body.title,
        });
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Fetch all categories
//-------------------------------------------------------------------
const categoryFetchAllController = expressAsyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({}).populate('user').sort('-createdAt');
        res.json(categories);
    } catch (error) {
        res.json(error)
    }
});

//-------------------------------------------------------------------
//Fetch single category
//-------------------------------------------------------------------
const categoryFetchSingleController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const categories = await Category.findById(id).populate('user');
        res.json(categories);
    } catch (error) {
        res.json(error)
    }
});

//-------------------------------------------------------------------
//Update category
//-------------------------------------------------------------------
const categoryUpdateController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    try {
        const category = await Category.findByIdAndUpdate(id, {
            title: req?.body?.title,
        }, {
            new: true,
            runValidators: true,
        })
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

//-------------------------------------------------------------------
//Delete category
//-------------------------------------------------------------------
const categoryDeleteController = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);

    try {
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});


module.exports = {
    categoryCreateController,
    categoryFetchAllController,
    categoryFetchSingleController,
    categoryUpdateController,
    categoryDeleteController,
}