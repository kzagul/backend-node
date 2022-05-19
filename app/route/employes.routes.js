const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const EmployesCotroller = require('../controller/employes.controller');

router.get('/employes',authMiddleware, EmployesCotroller.getEmployes);
router.get('/employes/:id',authMiddleware, EmployesCotroller.getEmployeById);
router.get('/employes/:id/meetings', EmployesCotroller.getEmployeMeetings);
router.post('/employes', authMiddleware , EmployesCotroller.postEmploye);
router.put('/employes/:id',authMiddleware, EmployesCotroller.putEmploye);
router.delete('/employes/:id', authMiddleware, EmployesCotroller.deleteEmploye);
router.get('/employes_chart',  EmployesCotroller.getChartInfo);

module.exports = router;
