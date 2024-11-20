const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  try {
    // Destructure role directly from the user object
    const { role } = req.user;
    
    // Set availability based on user role, return all rooms if undefined
    const availability = role === 'user' ? true : undefined;

    // Fetch rooms based on availability, if undefined, return all rooms
    const query = availability !== undefined ? { availability } : {};
    const rooms = await Room.find(query);

    // Respond with the rooms
    res.json(rooms);
  } catch (error) {
    // Return a standardized error message with status
    res.status(500).json({ error: error.message });
  }
};


exports.createRoom=async(req,res)=>{
    try{
      
        const room=new Room(req.body)
        await room.save();
        res.status(201).json(room)  
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }

}

exports.deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  await Room.findByIdAndDelete(roomId);
  res.json({ message: "Room deleted successfully" });
};

exports.editRoom=async(req,res)=>{
  const {roomId}=req.params;
  try {
    const room = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
}