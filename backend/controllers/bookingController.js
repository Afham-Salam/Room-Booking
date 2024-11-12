const Booking = require('../models/Booking');


exports.createBooking = async (req, res) => {
    const { userId, roomId, bookingDate, startTime, endTime } = req.body;
  
    try {
      const room = await Room.findById(roomId);
      if (!room || !room.availability) {
        return res.status(400).json({ message: 'Room not available' });
      }
  
      const newBooking = new Booking({ userId, roomId, bookingDate, startTime, endTime });
      await newBooking.save();
  
      room.availability = false;
      await room.save();
  
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getUserBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.userId }).populate('roomId');
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };