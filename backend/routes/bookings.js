const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getUserCurrentBookings, checkAvailbilityHandler } = require('../controllers/bookingController');
const {auth} = require('../middleware/authMiddleware');

router.post('/create', auth, createBooking);
router.get('/all', auth, getUserBookings);
router.get('/current-user/all', getUserCurrentBookings);
router.get('/check-avaliability', checkAvailbilityHandler);

module.exports = router;
