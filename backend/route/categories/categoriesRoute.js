const express = require('express');
const {
    categoryCreateController,
    categoryFetchAllController,
    categoryUpdateController,
    categoryDeleteController,
    categoryFetchSingleController
} = require("../../controllers/categories/categoriesController");
const authMiddleWare = require("../../middlewares/auth/authMiddleware");
const categoriesRoute = express.Router();

categoriesRoute.put('/:id', authMiddleWare, categoryUpdateController);
categoriesRoute.delete('/:id', authMiddleWare, categoryDeleteController);
categoriesRoute.get('/:id', authMiddleWare, categoryFetchSingleController);
categoriesRoute.post('/', authMiddleWare, categoryCreateController);
categoriesRoute.get('/', authMiddleWare, categoryFetchAllController);

module.exports = categoriesRoute;
