const AbstractController = require('../AbstractController');
const CatalogMenuModel = require('../../model/catalog/catalog-menu.model');

class CatalogMenuController extends AbstractController {
    constructor() {
        super(CatalogMenuModel);
    }
}

module.exports = new CatalogMenuController();