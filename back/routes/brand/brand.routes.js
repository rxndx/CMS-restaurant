const Router = require('express')
const router = new Router()
const brandController = require('../../controller/brand/brand.controller')
const blockController = require('../../controller/brand/block.controller')

router.post('/brand', brandController.create.bind(brandController))
router.get('/brand', brandController.getAll.bind(brandController))
router.get('/brand/:id', brandController.getOne.bind(brandController))
router.put('/brand', brandController.update.bind(brandController))
router.delete('/brand/:id', brandController.delete.bind(brandController))

router.post('/block', blockController.create.bind(blockController))
router.get('/block', blockController.getAll.bind(blockController))
router.get('/block/:id', blockController.getOne.bind(blockController))
router.put('/block', blockController.update.bind(blockController))
router.delete('/block/:id', blockController.delete.bind(blockController))

module.exports = router