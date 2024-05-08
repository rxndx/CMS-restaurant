const AbstractController = require('../AbstractController');
const CatalogModel = require('../../model/catalog/catalog.model');

class CatalogController extends AbstractController {
    constructor() {
        super(CatalogModel);
    }
}

module.exports = new CatalogController();