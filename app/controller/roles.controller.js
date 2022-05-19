const db = require('../DBConnection')

//API
class RolesController {
    //API GET all contacts
    async getRoles(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('ROLES');
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
}

module.exports = new RolesController();