const AbstractController = require('../AbstractController');
const DesignModel = require('../../model/design/design.model');

class DesignController extends AbstractController {
    constructor() {
        super(DesignModel);
    }
}

module.exports = new DesignController();