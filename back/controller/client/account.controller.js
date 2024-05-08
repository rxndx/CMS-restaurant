const AbstractController = require('../AbstractController');
const AccountModel = require('../../model/client/account.model');

class AccountController extends AbstractController {
    constructor() {
        super(AccountModel);
    }
}

module.exports = new AccountController();