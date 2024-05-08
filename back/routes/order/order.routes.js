const Router = require('express')
const router = new Router()
const orderController = require('../../controller/order/order.controller')
const orderItemController = require('../../controller/order/order-item.controller')
const reviewController = require('../../controller/order/review.controller')

router.post('/orders', orderController.create.bind(orderController))
router.get('/orders', orderController.getAll.bind(orderController))
router.get('/orders/:id', orderController.getOne.bind(orderController))
router.put('/orders', orderController.update.bind(orderController))
router.delete('/orders/:id', orderController.delete.bind(orderController))

router.post('/choices', orderItemController.create.bind(orderItemController))
router.get('/choices', orderItemController.getAll.bind(orderItemController))
router.get('/choices/:id', orderItemController.getOne.bind(orderItemController))
router.put('/choices', orderItemController.update.bind(orderItemController))
router.delete('/choices/:id', orderItemController.delete.bind(orderItemController))

router.post('/review', reviewController.create.bind(reviewController))
router.get('/review', reviewController.getAll.bind(reviewController))
router.get('/review/:id', reviewController.getOne.bind(reviewController))
router.put('/review', reviewController.update.bind(reviewController))
router.delete('/review/:id', reviewController.delete.bind(reviewController))

module.exports = router