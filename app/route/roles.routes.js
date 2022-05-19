const Router = require('express');
const router = new Router();

const RolesController = require('../controller/roles.controller');

router.get('/roles', RolesController.getRoles);

module.exports = router;