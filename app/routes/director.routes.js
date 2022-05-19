const Router = require('express')
const router = new Router()

//link to director controller
const directorController = require('../controllers/director.controller')

//GET
router.get('/director', directorController.getDirectors)
router.get('/director/:id', directorController.getDirectorById)
//POST
router.post('/director', directorController.postDirector)
//PUT
router.put('/director/:id', directorController.putDirector)
//DELETE
router.delete('/director/:id', directorController.deleteDirector)

module.exports = router