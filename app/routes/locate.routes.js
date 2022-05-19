const Router = require('express')
const router = new Router()

//link to locate controller
const locateController = require('../controllers/locate.controller')

//GET
router.get('/locate', locateController.getLocates)
router.get('/locate/:id', locateController.getLocateById)
router.get('/locateAreas', locateController.getLocatesArea)
//POST
router.post('/locate', locateController.postLocate)
//PUT
router.put('/locate/:id', locateController.putLocate)
//DELETE
router.delete('/locate/:id', locateController.deleteLocate)

module.exports = router

