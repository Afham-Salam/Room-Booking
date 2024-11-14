const express = require('express');
const { getRooms, createRoom,deleteRoom } = require('../controllers/roomController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getRooms);
router.post('/create', auth, adminAuth, createRoom);
router.delete('/:roomId',auth, adminAuth,deleteRoom)


module.exports = router;
