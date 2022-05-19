const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const GuestsCotroller = require('../controller/guests.controller');

router.get('/guests',authMiddleware, GuestsCotroller.getGuests);
router.get('/guests/:id',authMiddleware, GuestsCotroller.getGuestById);
router.get('/guests/:id/meetings', GuestsCotroller.getGuestMeetings);
router.post('/guests', authMiddleware , GuestsCotroller.postGuest);
router.put('/guests/:id',authMiddleware, GuestsCotroller.putGuest);
router.delete('/guests/:id', authMiddleware, GuestsCotroller.deleteGuest);
router.get('/guests_chart',  GuestsCotroller.getChartInfo);

module.exports = router;
