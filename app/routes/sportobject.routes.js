const Router = require('express')
const router = new Router()

const sportObjectController = require('../controllers/sportobject.controller')

router.get('/sportobject', sportObjectController.getSportObjects)
router.get('/sportobject/:id', sportObjectController.getSportObjectById)
router.post('/sportobject', sportObjectController.postSportObject)
router.put('/sportobject/:id', sportObjectController.putSportObject)
router.delete('/sportobject/:id', sportObjectController.deleteSportObject)

module.exports = router