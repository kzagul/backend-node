const Router = require('express');
const router = new Router();


const DepartamentController = require('../controller/departament.controller');

router.get('/departaments', DepartamentController.getDepartaments);
router.get('/departaments/:id', DepartamentController.getDepartamentById);
router.post('/departaments', DepartamentController.postDepartament);

module.exports = router;