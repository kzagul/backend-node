const db = require('../DBconnection')

//APIs
class TrainerController {
    //API GET all trainers
    async getTrainers(req, res, next,) {
        try {
            let sql = `Select * from trainer`
            let result = await db.query(sql)
            // res.send(result)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API GET trainer by id
    async getTrainerById(req, res, next){
        try{
            const id = req.params.id
            let sql = `SELECT * FROM trainer WHERE id = $1`
            let result = await db.query(sql, [id])
            // res.send(result)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Надо проверить
    //Проверить связку с sportobject
    //API POST new trainer
    async postTrainer(req, res, next){
        try{
            const {fullname, sportdirection, qualification, fk_sportobject_id} = req.body
            const result = await db.query(`INSERT INTO trainer (fullname, sportdirection, qualification, fk_sportobject_id) values($1, $2, $3, $4) RETURNING *`, [fullname, sportdirection, qualification, fk_sportobject_id])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Надо проверить
    //Проверить связку с sportobject
    //API PUT trainer
    async putTrainer(req, res, next){
        try{
            const {fullname, sportdirection, qualification, fk_sportobject_id} = req.body
            const id = req.params.id
            // console.log(name, surname)
            const result = await db.query(`UPDATE trainer SET fullname = $1, sportdirection = $2, qualification = $3, fk_sportobject_id = $4 WHERE id = $5 RETURNING *`, [fullname, sportdirection, qualification, fk_sportobject_id, id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //API DELETE trainer
    async deleteTrainer(req, res, next){
        try{
            let sql = `DELETE FROM trainer WHERE id = $1`
            let id = req.params.id
            const result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new TrainerController()