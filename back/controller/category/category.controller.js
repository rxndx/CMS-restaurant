const AbstractController = require('../AbstractController');
const CategoryModel = require('../../model/category/category.model');

class CategoryController extends AbstractController {
    constructor() {
        super(CategoryModel);
    }
}

module.exports = new CategoryController();