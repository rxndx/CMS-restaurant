const AbstractController = require('../AbstractController');
const DiscountModel = require('../../model/facilities/discount.model');

class DiscountController extends AbstractController {
    constructor() {
        super(DiscountModel);
    }
}

module.exports = new DiscountController();