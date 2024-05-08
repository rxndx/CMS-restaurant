const Router = require('express')
const router = new Router()
const menuController = require('../../controller/menu/menu.controller')
const menuItemController = require('../../controller/menu/menu-item.controller')

router.post('/menu', menuController.create.bind(menuController));
router.get('/menu', menuController.getAll.bind(menuController))
router.get('/menu/:id', menuController.getOne.bind(menuController))
router.put('/menu', menuController.update.bind(menuController))
router.delete('/menu/:id', menuController.delete.bind(menuController))

router.post('/dish', menuItemController.create.bind(menuItemController))
router.get('/dish', menuItemController.getAll.bind(menuItemController))
router.get('/dish/:id', menuItemController.getOne.bind(menuItemController))
router.put('/dish', menuItemController.update.bind(menuItemController))
router.delete('/dish/:id', menuItemController.delete.bind(menuItemController))

module.exports = router