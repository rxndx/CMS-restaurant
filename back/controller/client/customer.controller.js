const AbstractController = require('../AbstractController');
const CustomerModel = require('../../model/client/customer.model');

class CustomerController extends AbstractController {
    constructor() {
        super(CustomerModel);
    }
}

module.exports = new CustomerController();