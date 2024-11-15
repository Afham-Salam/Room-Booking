const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const {auth} = require('../middleware/authMiddleware');

router.post('/create', auth, createBooking);
router.get('/all', auth, getUserBookings);

module.exports = router;
