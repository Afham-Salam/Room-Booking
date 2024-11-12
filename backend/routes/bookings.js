const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth('user'), createBooking);
router.get('/', auth('user'), getUserBookings);

module.exports = router;
