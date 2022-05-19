const db = require('../DBConnection')
const bcrypt = require('bcryptjs');

class EmpolyesController {
    async getEmployes(req, res, next ) {
        try{
            const dbRes = await db.select('EMPLOYES.ID as ID',
                                'EMPLOYES.NAME as NAME',
                                'EMPLOYES.LAST_NAME as LAST_NAME',
                                'EMPLOYES.PATRONYMIC as PATRONYMIC',
                                'EMPLOYES.PHONE as PHONE',
                                'POSTS.POST_NAME as POST_NAME',
                                'EMPLOYES.POST_ID as POST_ID',
                                'POSTS.DEPART_ID as DEPART_ID',
                                'DEPARTAMENT.DEPART_NAME as DEPART_NAME',
                                'EMPLOYES.ADDRESS as ADDRESS',
                                'USERS.EMAIL as EMAIL',
                                ).from('EMPLOYES')
                                .leftJoin('POSTS',"EMPLOYES.POST_ID","POSTS.POST_ID" )
                                .leftJoin('DEPARTAMENT','POSTS.DEPART_ID','DEPARTAMENT.DEPART_ID')
                                .leftJoin('USERS', "EMPLOYES.USER_ID", "USERS.USER_ID");
            dbRes.forEach(item => Object.entries(item).forEach(([key,value] )=> item[key]=value?.toString().trim()));
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }

    async getEmployeById(req, res, next){
        try{
            const id = req.params.id;
            const dbRes = await db('EMPLOYES').where('ID',id)
                .leftJoin("USERS", "EMPLOYES.USER_ID", "USERS.USER_ID")
                .leftJoin('POSTS', 'EMPLOYES.POST_ID', 'POSTS.POST_ID' )
                .leftJoin('ROLES', 'USERS.ROLE_ID', 'ROLES.ROLE_ID' )
                .leftJoin('DEPARTAMENT', 'POSTS.DEPART_ID', 'DEPARTAMENT.DEPART_ID').first();
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async postEmploye(req, res, next){
        try{
            const {LOGIN, EMAIL, PASSWORD, ROLE_ID,...rest} = req.body;
            const userRes = await db('USERS')
                        .insert({LOGIN, EMAIL, PASSWORD:bcrypt.hashSync(PASSWORD), ROLE_ID})
                        .returning('USER_ID');
            const employeRes = await db('EMPLOYES')
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


    async putEmploye(req, res, next){
        try{
            const {ID, LOGIN, PASSWORD, EMAIL, ROLE_ID, ROLE_NAME, POST_NAME, DEPART_ID, DEPART_NAME, ...rest} = req.body;
            const result = await db('EMPLOYES').update(rest).where("ID", ID).returning('*');
            const {USER_ID} = result[0];
            const userResult = await db('USERS').update({LOGIN, PASSWORD:bcrypt.hashSync(PASSWORD), EMAIL, ROLE_ID}).where("USER_ID", USER_ID).returning('*');
            res.json({...result,...userResult});
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async deleteEmploye(req, res, next){
        try{
            const result = await db('EMPLOYES').where("ID", req.params.id).del().returning('*');
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
            const emps = await db.select('ID',"NAME","LAST_NAME").from('EMPLOYES');
            const meetings = await db.select('*').from('MEETINGS');
            const result = []
            for(let employe of emps){
                const {ID} = employe;
                const meetingsOfEmploye = meetings.filter(item =>item.MEMBERS.includes(ID));
                result.push({...employe, count: meetingsOfEmploye.length})
            }
            res.json(result);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

    async getEmployeMeetings(req,res,next){
        try {
            const {id} = req.params;
            const meetings = await db.select('*').from('MEETINGS');
            console.log(meetings)
            const result = meetings.filter(item =>{return item.MEMBERS.includes(+id)})
            console.log(id, result)
            res.json(result);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

}

module.exports = new EmpolyesController()