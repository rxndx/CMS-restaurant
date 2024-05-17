const AbstractController = require('../AbstractController');
const BlockModel = require('../../model/brand/block.model');

class BlockController extends AbstractController {
    constructor() {
        super(BlockModel);
    }
}

module.exports = new BlockController();