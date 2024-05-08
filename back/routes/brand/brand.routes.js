const Router = require('express')
const router = new Router()
const brandController = require('../../controller/brand/brand.controller')

router.post('/brand', brandController.create.bind(brandController))
router.get('/brand', brandController.getAll.bind(brandController))
router.get('/brand/:id', brandController.getOne.bind(brandController))
router.put('/brand', brandController.update.bind(brandController))
router.delete('/brand/:id', brandController.delete.bind(brandController))

module.exports = router