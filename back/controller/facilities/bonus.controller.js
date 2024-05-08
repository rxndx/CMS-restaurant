const AbstractController = require('../AbstractController');
const BonusModel = require('../../model/facilities/bonus.model');

class BonusController extends AbstractController {
    constructor() {
        super(BonusModel);
    }
}

module.exports = new BonusController();