const db = require('../DBConnection')

//API
class PostsController {
    //API GET all contacts
    async getPosts(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('POSTS');
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
}

module.exports = new PostsController();