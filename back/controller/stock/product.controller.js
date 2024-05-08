const AbstractController = require('../AbstractController');
const ProductModel = require('../../model/stock/product.model');

class ProductController extends AbstractController {
    constructor() {
        super(ProductModel);
    }
}

module.exports = new ProductController();