const express = require('express');
const { getRooms, createRoom,deleteRoom, editRoom } = require('../controllers/roomController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/all', auth, getRooms);
router.post('/create',auth, adminAuth,createRoom);
router.put('/edit/:roomId',auth, adminAuth,editRoom)
router.delete('/delete/:roomId',auth, adminAuth,deleteRoom)


module.exports = router;
