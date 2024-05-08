const Router = require('express')
const router = new Router()
const designController = require('../../controller/design/design.controller')

router.post('/design', designController.create.bind(designController))
router.get('/design', designController.getAll.bind(designController))
router.get('/design/:id', designController.getOne.bind(designController))
router.put('/design', designController.update.bind(designController))
router.delete('/design/:id', designController.delete.bind(designController))

module.exports = router