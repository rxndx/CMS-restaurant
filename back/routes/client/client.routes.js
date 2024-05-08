const Router = require('express')
const router = new Router()
const accountController = require('../../controller/client/account.controller')
const customerController = require('../../controller/client/customer.controller')

router.post('/accounts', accountController.create.bind(accountController))
router.get('/accounts', accountController.getAll.bind(accountController))
router.get('/accounts/:id', accountController.getOne.bind(accountController))
router.put('/accounts', accountController.update.bind(accountController))
router.delete('/accounts/:id', accountController.delete.bind(accountController))

router.post('/customers', customerController.create.bind(customerController))
router.get('/customers', customerController.getAll.bind(customerController))
router.get('/customers/:id', customerController.getOne.bind(customerController))
router.put('/customers', customerController.update.bind(customerController))
router.delete('/customers/:id', customerController.delete.bind(customerController))

module.exports = router