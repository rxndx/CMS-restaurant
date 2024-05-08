const AbstractController = require('../AbstractController');
const TagsMenuModel = require('../../model/tags/tags-menu.model');

class TagsMenuController extends AbstractController {
    constructor() {
        super(TagsMenuModel);
    }
}

module.exports = new TagsMenuController();