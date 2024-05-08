const AbstractController = require('../AbstractController');
const TagsModel = require('../../model/tags/tags.model');

class TagsController extends AbstractController {
    constructor() {
        super(TagsModel);
    }
}

module.exports = new TagsController();