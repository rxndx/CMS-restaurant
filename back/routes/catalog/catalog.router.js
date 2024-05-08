const Router = require('express')
const router = new Router()
const catalogController = require('../../controller/catalog/catalog.controller')
const catalogMenuController = require('../../controller/catalog/catalog-menu.controller')

router.post('/catalog/menu', catalogMenuController.create.bind(catalogMenuController))
router.get('/catalog/menu', catalogMenuController.getAll.bind(catalogMenuController))
router.get('/catalog/menu/:id', catalogMenuController.getOne.bind(catalogMenuController))
router.put('/catalog/menu', catalogMenuController.update.bind(catalogMenuController))
router.delete('/catalog/menu/:id', catalogMenuController.delete.bind(catalogMenuController))

router.post('/catalog', catalogController.create.bind(catalogController));
router.get('/catalog', catalogController.getAll.bind(catalogController));
router.get('/catalog/:id', catalogController.getOne.bind(catalogController));
router.put('/catalog', catalogController.update.bind(catalogController));
router.delete('/catalog/:id', catalogController.delete.bind(catalogController));

module.exports = router