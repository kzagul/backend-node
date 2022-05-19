const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const AuthController = require('../controller/auth.controller');

router.post('/auth', [
    check('LOGIN', 'Имя пользователя не может быть пустым').notEmpty(),
    check('PASSWORD', 'Пароль не может быть меньше 4-ех символов').isLength({min:4, max: Number.MAX_VALUE})
] , AuthController.GetToken);
router.post('/registrate', AuthController.addUser);

module.exports = router;