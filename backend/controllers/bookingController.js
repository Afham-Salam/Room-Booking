const Booking = require('../models/Booking');
const Room = require('../models/Room');


exports.createBooking = async (req, res) => {
    const { userId, roomId, bookingDate, startTime, endTime } = req.body;
  
    try {
      const room = await Room.findById(roomId);
      console.log({room})

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
    console.log("user data: ",req.user);
    try {
      const bookings = await Booking.find().populate('roomId');
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getUserCurrentBookings = async (req, res) => {
    try {

      console.log("user data: ",req.user);
      
      const bookings = await Booking.find({userId: req.user.userId}).populate('roomId');
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };