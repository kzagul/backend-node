const db = require('../DBconnection')

//API
class ContactsController {
    //API GET all contacts
    async getContacts(req, res, next ) {
        try {
            let sql = `Select * from contacts`
            let result = await db.query(sql)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API GET contact by id
    async getContactsById(req, res, next){
        try{
            const id = req.params.id
            let sql = `SELECT * FROM contacts WHERE id = $1`
            let result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API POST new contacts
    async postContacts(req, res, next){
        try{
            const {website, phonenumber, vk, inst} = req.body
            const result = await db.query(`INSERT INTO contacts (website, phonenumber, vk, inst) values($1, $2, $3, $4) RETURNING *`, [website, phonenumber, vk, inst])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API PUT contacts
    async putContacts(req, res, next){
        try{
            const {website, phonenumber, vk, inst} = req.body
            const id = req.params.id
            const result = await db.query(`UPDATE contacts SET website = $1, phonenumber = $2, vk = $3, inst = $4 WHERE id = $5 RETURNING *`, [website, phonenumber, vk, inst, id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API DELETE contacts
    async deleteContacts(req, res, next){
        try{
            let sql = `DELETE FROM contacts WHERE id = $1`
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

module.exports = new ContactsController()