const Router = require('express');
const router = new Router();

const UserController = require('../controller/user.controller');

router.get('/user/:id', UserController.getUserInfoById);

module.exports = router;