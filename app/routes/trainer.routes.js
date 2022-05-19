const Router = require('express')
const router = new Router()

//link to director controller
const trainerController = require('../controllers/trainer.controller')

// router.post('/post', postController.createPost)
router.get('/trainer', trainerController.getTrainers)
router.get('/trainer/:id', trainerController.getTrainerById)
router.post('/trainer', trainerController.postTrainer)
router.put('/trainer/:id', trainerController.putTrainer)
router.delete('/trainer/:id', trainerController.deleteTrainer)

module.exports = router