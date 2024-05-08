const Router = require('express')
const router = new Router()
const countryController = require('../../controller/country/country.controller')

router.post('/country', countryController.create.bind(countryController))
router.get('/country', countryController.getAll.bind(countryController))
router.get('/country/:id', countryController.getOne.bind(countryController))
router.put('/country', countryController.update.bind(countryController))
router.delete('/country/:id', countryController.delete.bind(countryController))

module.exports = router