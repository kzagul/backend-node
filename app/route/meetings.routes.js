const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const MeetingsCotroller = require('../controller/meetings.controller');

router.get('/meetings',authMiddleware, MeetingsCotroller.getMeetings);
router.get('/meetings/:id',authMiddleware, MeetingsCotroller.getMeetingById);
router.post('/meetings',authMiddleware ,MeetingsCotroller.postMeeting);
router.delete('/meetings/:id', authMiddleware, MeetingsCotroller.deleteMeeting);
router.put('/meetings/:id', authMiddleware, MeetingsCotroller.putMeeting);

module.exports = router;
