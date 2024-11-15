import React, { useState } from 'react';
import api from '../api';

export default function RoomManagement() {
  const [roomData, setRoomData] = useState({
    roomName: "",
    capacity: "",
    features: "",
    pricePerHour: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    
      console.log("Room Data:", roomData);  
    const res = await api.post("/rooms/create",roomData)

    setRoomData({
      roomName: "",
      capacity: "",
      features: "",
      pricePerHour: "",
      availability: true,
    });
    }
    catch(error){
      console.error(error,"error")
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Room Name</span>
          <input
            type="text"
            name="roomName"
            value={roomData.roomName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter room name"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Capacity</span>
          <input
            type="number"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter room capacity"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Features (comma-separated)</span>
          <input
            type="text"
            name="features"
            value={roomData.features}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Wi-Fi, Projector, Whiteboard"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Price Per Hour ($)</span>
          <input
            type="number"
            name="pricePerHour"
            value={roomData.pricePerHour}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter hourly rate"
          />
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="availability"
            checked={roomData.availability}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span className="ml-2 text-gray-700">Available</span>
        </label>

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Add Room
        </button>
      </form>
    </div>
  );
}
