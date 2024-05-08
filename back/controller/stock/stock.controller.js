const AbstractController = require('../AbstractController');
const StockModel = require('../../model/stock/stock.model');

class StockController extends AbstractController {
    constructor() {
        super(StockModel);
    }
}

module.exports = new StockController();