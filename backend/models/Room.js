const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  capacity: { type: Number, required: true },
  features: [{ type: String }],
  pricePerHour: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Room', roomSchema);
