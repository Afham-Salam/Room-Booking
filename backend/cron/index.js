const cron = require('node-cron');
const Room = require('../models/Room');

const cronjob = cron.schedule('*/5 * * * *', () => {
  console.log('running a task every minute');
  getBookings().then(bookings => {
    
    bookings.forEach(booking => {
      const currentTime = new Date();
      const endDate = new Date(booking.endDate);

      if (endDate < currentTime) {
        resetRoomAvailability(booking.roomId);
        console.log(`Room ${booking.roomId} is now available.`);
      }
    });
  }).catch(error => {
    console.error('Error fetching bookings:', error);
  });
});

const resetRoomAvailability = async (roomId) => {
    try {
      const room = await Room.findById(roomId);
      if (room) {
        room.available = true; 
        await room.save();  
        console.log(`Room ${roomId} availability  reset.`);
      } else {
        console.log(`Room ${roomId} not found.`);
      }
    } catch (error) {
      console.error(`Error resetting room availability for room ${roomId}:`, error);
    }
  };
  
module.exports = cronjob