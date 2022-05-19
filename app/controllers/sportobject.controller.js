const db = require('../DBconnection')

class SportObjectController {
    //API get all sport objects
    async getSportObjects(req, res, next,) {
        try {
            let sql = `SELECT * FROM sportobject`
            let result = await db.query(sql)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API GET sport object by id
    async getSportObjectById(req, res, next){
        try{
            const id = req.params.id
            let sql = `SELECT * FROM sportobject WHERE id = $1`
            let result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API POST new sport object
    async postSportObject(req, res, next){
        try{
            const {about, sportdirection, fk_sportinstitution_id} = req.body
            const result = await db.query(`INSERT INTO sportobject (about, sportdirection, fk_sportinstitution_id) values($1, $2, $3) RETURNING *`, [about, sportdirection, fk_sportinstitution_id])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API PUT sport object
    async putSportObject(req, res, next){
        try{
            const {about, sportdirection, fk_sportinstitution_id} = req.body
            const id = req.params.id
            const result = await db.query(`UPDATE sportobject SET about = $1, sportdirection = $2, fk_sportinstitution_id = $3 WHERE id = $4 RETURNING *`, [about, sportdirection, fk_sportinstitution_id, id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API DELETE sport object
    async deleteSportObject(req, res, next){
        try{
            let sql = `DELETE FROM sportobject WHERE id = $1`
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

module.exports = new SportObjectController()