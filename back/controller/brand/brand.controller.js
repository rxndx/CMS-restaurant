const AbstractController = require('../AbstractController');
const BrandModel = require('../../model/brand/brand.model');

class BrandController extends AbstractController {
    constructor() {
        super(BrandModel);
    }
}

module.exports = new BrandController();