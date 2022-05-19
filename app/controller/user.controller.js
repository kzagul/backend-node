const db = require('../DBConnection')

//API
class UserController {
    //API GET all contacts
    async getUserInfoById(req, res, next ) {
        try{
            const {ID} = req.params;
            const dbRes = await db.select('*').from('USERS').where('USER_ID', ID).first();
            res.json(dbRes[0]);
        }
        catch(err) {
            next(err);
        };
    }
}

module.exports = new UserController();