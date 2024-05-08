const Router = require('express')
const router = new Router()
const categoryController = require('../../controller/category/category.controller')

router.post('/category', categoryController.create.bind(categoryController))
router.get('/category', categoryController.getAll.bind(categoryController))
router.get('/category/:id', categoryController.getOne.bind(categoryController))
router.put('/category', categoryController.update.bind(categoryController))
router.delete('/category/:id', categoryController.delete.bind(categoryController))

module.exports = router