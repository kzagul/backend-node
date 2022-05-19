const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const MemberCardsController = require('../controller/membercards.controller');

router.post('/member_cards',authMiddleware, MemberCardsController.postMeetingCard);
router.get('/member_cards/:id', MemberCardsController.getMemberCardById);
router.delete('/member_cards/:id', authMiddleware  ,MemberCardsController.deleteMemberCard);

module.exports = router;
