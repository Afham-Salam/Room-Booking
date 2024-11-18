import React, { useState, useEffect } from "react";
import api from "../api";

export default function RoomManagement() {
  const [roomData, setRoomData] = useState({
    roomName: "",
    capacity: "",
    features: "",
    pricePerHour: "",
    availability: true,
  });
  const [roomList, setRoomList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    roomName: "",
    capacity: "",
    features: "",
    pricePerHour: "",
    availability: true,
  });

  // Fetch rooms from the API on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all");
        setRoomList(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  // Handle input changes for adding new room
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit new room data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/rooms/create", roomData);
      setRoomList((prev) => [...prev, res.data]);
      setRoomData({
        roomName: "",
        capacity: "",
        features: "",
        pricePerHour: "",
        availability: true,
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  // Handle clicking on edit
  const handleEditClick = (id, currentData) => {
    setEditId(id);
    setEditFormData({roomName:currentData.roomName,capacity:currentData.capacity, features:currentData.features,pricePerHour:currentData.pricePerHour,availability:currentData.availability });
  };

  // Handle input changes for editing the room
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle saving the edited room
  const handleSave = async (id) => {
    try {
      await api.put(`/rooms/edit/${editId}`, editFormData);
      setRoomList((prev) =>
        prev.map((room) =>
          room._id === editId ? { ...room, ...editFormData } : room
        )
      );
      setEditId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditId(null); // Exit edit mode
  };

  // Handle deleting a room
  const handleDelete = async (id) => {
    try {
      await api.delete(`/rooms/delete/${id}`);
      setRoomList((prev) => prev.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <>
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
            <span className="text-gray-700">Price Per Day</span>
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

      {/* Room List Display */}
      <div className="p-4">
        <div className="overflow-x-auto flex justify-center">
          <table className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">
                  Room Name
                </th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">
                  Capacity
                </th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">
                  Price
                </th>
                <th className="px-4 py-2 text-center text-sm border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {roomList.map((room) => (
                <tr key={room._id} className="hover:bg-gray-100">
                  {editId === room._id ? (
                    <>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="text"
                          name="roomName"
                          value={editFormData.roomName}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 "
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="number"
                          name="capacity"
                          value={editFormData.capacity}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 "
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="number"
                          name="pricePerHour"
                          value={editFormData.pricePerHour}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 "
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button
                          onClick={()=> handleSave(room._id)} // Save edited room
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel} // Cancel editing
                          className="ml-2 px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        {room.roomName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        {room.capacity}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        ${room.pricePerHour}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button
                          onClick={() => handleEditClick(room._id, room)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
