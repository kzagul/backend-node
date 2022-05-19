const db = require('../DBConnection')

class MemberCardsController {
    async postMeetingCard(req, res, next){
        try{
            const result = await db('MEMBER_CARDS').insert(req.body);
            res.json(result)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async getMemberCardById(req, res, next){
        try{
            const { ID } = req.body;
            const result = await db.select('MEMBER_CARDS').where("ID", ID)
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }


    async putMemberCard(req, res, next){
        try{
            const {ID, ...rest} = req.body;
            const result = await db('MEMBER_CARDS').update(rest).where("ID", ID)
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async deleteMemberCard(req, res, next){
        try{
            const result = await db('MEMBER_CARDS').where("ID", req.params.id).del();
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

}

module.exports = new MemberCardsController()