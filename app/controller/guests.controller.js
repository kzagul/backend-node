const db = require('../DBConnection')
const bcrypt = require('bcryptjs');

class GuestsController {
    async getGuests(req, res, next ) {
        try{
            const dbRes = await db.select('GUESTS.ID as ID',
                                'GUESTS.NAME as NAME',
                                'GUESTS.LAST_NAME as LAST_NAME',
                                'GUESTS.PATRONYMIC as PATRONYMIC',
                                'GUESTS.PHONE as PHONE',
                                'USERS.EMAIL as EMAIL',
                                'ROLES.ROLE_NAME as ROLE_NAME'
                                ).from('GUESTS')
                                .leftJoin('USERS',"USERS.USER_ID","GUESTS.USER_ID" )
                                .leftJoin('ROLES', 'USERS.ROLE_ID', 'ROLES.ROLE_ID')
            dbRes.forEach(item => Object.entries(item).forEach(([key,value] )=> item[key]=value?.toString().trim()));
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }

    async getGuestById(req, res, next){
        try{
            const id = req.params.id;
            const dbRes = await db('GUESTS').where('ID',id)
                .leftJoin("USERS", "GUESTS.USER_ID", "USERS.USER_ID")
                .leftJoin('ROLES', 'USERS.ROLE_ID', 'ROLES.ROLE_ID' ).first();
            console.log(dbRes)
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async postGuest(req, res, next){
        try{
            const {LOGIN, EMAIL, PASSWORD, ROLE_ID,...rest} = req.body;
            const userRes = await db('USERS')
                        .insert({LOGIN, EMAIL, PASSWORD:bcrypt.hashSync(PASSWORD), ROLE_ID: 33})
                        .returning('USER_ID');
            const employeRes = await db('GUESTS')
                                .insert({...rest, USER_ID: userRes[0].USER_ID})
                                .returning('*');
            console.log(employeRes);
            res.json(employeRes)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async putGuest(req, res, next){
        try{
            const {ID, LOGIN, PASSWORD, EMAIL, ROLE_ID, ROLE_NAME, ...rest} = req.body;
            const result = await db('GUESTS').update(rest).where("ID", ID).returning('*');
            const {USER_ID} = result[0];
            const userResult = await db('USERS').update({LOGIN, PASSWORD:bcrypt.hashSync(PASSWORD), EMAIL, ROLE_ID: '33'}).where("USER_ID", USER_ID).returning('*');
            res.json({...result,...userResult});
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async deleteGuest(req, res, next){
        try{
            const result = await db('GUESTS').where("ID", req.params.id).del().returning('*');
            const {USER_ID} = result[0];
            const userResult = await db('USERS').where("USER_ID", USER_ID).del().returning('*');
            res.json({...result[0], ...userResult[0]});
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async getChartInfo(req,res,next) {
        try {
            const emps = await db.select('ID',"NAME","LAST_NAME").from('GUESTS');
            const meetings = await db.select('*').from('MEETINGS');
            const result = []
            for(let employe of emps){
                const {ID} = employe;
                const meetingsOfEmploye = meetings.filter(item =>item.GUESTS.includes(ID));
                result.push({...employe, count: meetingsOfEmploye.length})
            }
            res.json(result);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

    async getGuestMeetings(req,res,next){
        try {
            const {id} = req.params;
            const meetings = await db.select('*').from('MEETINGS');
            console.log(meetings)
            const result = meetings.filter(item =>{return item.GUESTS.includes(+id)})
            console.log(id, result)
            res.json(result);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

}

module.exports = new GuestsController()