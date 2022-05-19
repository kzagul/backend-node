const db = require('../DBConnection');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/app.config')

const generateAccessToken = (user) => {
    const payload = {
        user:user
    };
    const token = jwt.sign(payload, secret, {expiresIn: "24h"});
    return token;
}

class AuthController {
    async addUser(req,res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Reg Error', errors})
            }
            const {LOGIN, PASSWORD, EMAIL, ROLE_ID }  = req.body;
            const check = await db.select('*').from('USERS').where('LOGIN', LOGIN)[0];
            if(!!check){
                return res.status(400).json({message:'Login is using'})
            }
            const hashesPassword = bcrypt.hashSync(PASSWORD);
            const result = await db('USERS').insert({LOGIN, PASSWORD: hashesPassword,EMAIL, ROLE_ID});
            res.json(result);
        }
        catch(e){
            console.log(e);
            res.status(400).json({message:'RegError'})
        }
    }

    async GetToken(req, res, next) {
        try{
            const {LOGIN, PASSWORD} = req.body;
            const user = await db.select('*').from('USERS').where('LOGIN', LOGIN).leftJoin('ROLES', 'USERS.ROLE_ID', 'ROLES.ROLE_ID').first();
            if(!user){
                return res.status(404).json({message:'Пользователь не найден'});
            }
            const validPassword = bcrypt.compareSync(PASSWORD, user.PASSWORD);
            if(!validPassword){
                return res.status(400).json({message:'Неверный пароль'});
            }
            const {USER_ID, ROLE_NAME, EMAIL, LOGIN:USER_LOGIN} = user;
            const employeProfile = await db.select('EMPLOYES.ID as ID').from('EMPLOYES').where('USER_ID', USER_ID).first();
            console.log(employeProfile)
            const token = generateAccessToken({...employeProfile, ...user, PASSWORD });
            return res.json({token});
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message:'LoginError'})
        }
    }
}

module.exports = new AuthController();