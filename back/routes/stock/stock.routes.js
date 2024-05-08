const Router = require('express')
const router = new Router()
const stockController = require('../../controller/stock/stock.controller')
const productController = require('../../controller/stock/product.controller')

router.post('/stock', stockController.create.bind(stockController))
router.get('/stock', stockController.getAll.bind(stockController))
router.get('/stock/:id', stockController.getOne.bind(stockController))
router.put('/stock', stockController.update.bind(stockController))
router.delete('/stock/:id', stockController.delete.bind(stockController))

router.post('/product', productController.create.bind(productController))
router.get('/product', productController.getAll.bind(productController))
router.get('/product/:id', productController.getOne.bind(productController))
router.put('/product', productController.update.bind(productController))
router.delete('/product/:id', productController.delete.bind(productController))

module.exports = router