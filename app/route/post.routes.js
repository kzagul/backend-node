const Router = require('express');
const router = new Router();


const PostsCotroller = require('../controller/posts.controller');

router.get('/posts', PostsCotroller.getPosts);

module.exports = router;