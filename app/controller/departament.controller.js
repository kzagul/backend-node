const db = require('../DBConnection')

//API
class DepartamentController {
    //API GET all contacts
    async getDepartaments(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('DEPARTAMENT');
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
    //API GET contact by id
    async getDepartamentById(req, res, next){
        try{
            const id = req.params.id
            const dbRes = await db('DEPARTAMENT').where('ID',id);
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API POST new contacts
    async postDepartament(req, res, next){
        try{
            const {NAME} = req.body
            const result = await db('DEPARTAMENT').insert({NAME})
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API PUT contacts
    async putDepartament(req, res, next){
        try{
            const {name} = req.body
            const {id} = req.params;
            const result = await db('DEPARTAMENT').update({NAME:name}).where('DEPART_ID', id)
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API DELETE contacts
    async deleteDepartament(req, res, next){
        try{

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new DepartamentController()