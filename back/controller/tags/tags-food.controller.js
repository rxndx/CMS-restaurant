const AbstractController = require('../AbstractController');
const TagsFoodModel = require('../../model/tags/tags-food.model');

class TagsFoodController extends AbstractController {
    constructor() {
        super(TagsFoodModel);
    }
}

module.exports = new TagsFoodController();