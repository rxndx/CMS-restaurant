const Router = require('express')
const router = new Router()

const tagsController = require('../../controller/tags/tags.controller')
const tagsFoodController = require('../../controller/tags/tags-food.controller')
const tagsMenuController = require('../../controller/tags/tags-menu.controller')

router.post('/tags/food', tagsFoodController.create.bind(tagsFoodController))
router.get('/tags/food', tagsFoodController.getAll.bind(tagsFoodController))
router.get('/tags/food/:id', tagsFoodController.getOne.bind(tagsFoodController))
router.put('/tags/food', tagsFoodController.update.bind(tagsFoodController))
router.delete('/tags/food/:id', tagsFoodController.delete.bind(tagsFoodController))

router.post('/tags/menu', tagsMenuController.create.bind(tagsMenuController))
router.get('/tags/menu', tagsMenuController.getAll.bind(tagsMenuController))
router.get('/tags/menu/:id', tagsMenuController.getOne.bind(tagsMenuController))
router.put('/tags/menu', tagsMenuController.update.bind(tagsMenuController))
router.delete('/tags/menu/:id', tagsMenuController.delete.bind(tagsMenuController))

router.post('/tags', tagsController.create.bind(tagsController))
router.get('/tags', tagsController.getAll.bind(tagsController))
router.get('/tags/:id', tagsController.getOne.bind(tagsController))
router.put('/tags', tagsController.update.bind(tagsController))
router.delete('/tags/:id', tagsController.delete.bind(tagsController))

module.exports = router