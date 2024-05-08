const AbstractController = require('../AbstractController');
const CountryModel = require('../../model/country/country.model');

class CountryController extends AbstractController {
    constructor() {
        super(CountryModel);
    }
}

module.exports = new CountryController();