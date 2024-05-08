const AbstractController = require('../AbstractController');
const MenuItemModel = require('../../model/menu/menu-item.model');

class MenuItemController extends AbstractController {
    constructor() {
        super(MenuItemModel);
    }
}

module.exports = new MenuItemController();