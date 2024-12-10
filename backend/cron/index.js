const cron = require('node-cron');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

// Function to check and update room availability
const checkAvailability = async () => {
  const now = new Date();
  try {
    console.log({ now });
    const gBookings = await Booking.find();
    console.log({gBookings});
    
    const expiredBookings = await Booking.find({ endTime: { $lt: now } });
    console.log({ expiredBookings });

    for (const booking of expiredBookings) {
      await Room.findByIdAndUpdate(booking.roomId, { availability: true });
      console.log(`Room ${booking.roomId} is now available (Booking ID: ${booking._id}).`);
    
    }

    if (expiredBookings.length === 0) {
      console.log('No expired bookings found.');
    } else {
      console.log('Room availability updates completed.');
    }

    return 
  } catch (error) {
    console.error('Error updating room availability:', error);
  }
};

// Schedule the cron job but do not start it automatically
const cronjob = cron.schedule(
  '0 9 * * *',
  async () => {
    console.log('Running a task to check and update room availability...');
    await checkAvailability();
  },
  { scheduled: false } // Disable auto-start
);

// Export both the cronjob and the checkAvailability function
module.exports = { cronjob, checkAvailability };
