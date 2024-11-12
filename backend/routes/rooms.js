const express = require('express');
const { getRooms, createRoom } = require('../controllers/roomController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getRooms);

router.post('/', auth, adminAuth, createRoom);

module.exports = router;
