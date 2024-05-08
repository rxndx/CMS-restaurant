const Router = require('express')
const router = new Router()
const bonusController = require('../../controller/facilities/bonus.controller')
const discountController = require('../../controller/facilities/discount.controller')

router.post('/bonus', bonusController.create.bind(bonusController))
router.get('/bonus', bonusController.getAll.bind(bonusController))
router.get('/bonus/:id', bonusController.getOne.bind(bonusController))
router.put('/bonus', bonusController.update.bind(bonusController))
router.delete('/bonus/:id', bonusController.delete.bind(bonusController))

router.post('/discount', discountController.create.bind(discountController))
router.get('/discount', discountController.getAll.bind(discountController))
router.get('/discount/:id', discountController.getOne.bind(discountController))
router.put('/discount', discountController.update.bind(discountController))
router.delete('/discount/:id', discountController.delete.bind(discountController))

module.exports = router