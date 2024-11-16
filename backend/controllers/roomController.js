const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
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