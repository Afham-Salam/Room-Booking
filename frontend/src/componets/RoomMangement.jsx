import React, { useState, useEffect } from "react";
import api from "../api";
import { Button, Popconfirm, Modal,message } from "antd";

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
  const [isModalVisible, setIsModalVisible] = useState(false); 

  // Fetch rooms data
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

  // Handle form data changes
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

  // Edit room data (opens the modal)
  const handleEditClick = (id, currentData) => {
    setEditId(id);
    setEditFormData({ ...currentData });
    setIsModalVisible(true);  
  };

  // Handle form data changes for edit
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save updated room data
  const handleSave = async () => {
    try {
    
      await api.put(`/rooms/edit/${editId}`, editFormData);
  
      setRoomList((prev) =>
        prev.map((room) =>
          room._id === editId ? { ...room, ...editFormData } : room
        )
      );
  
  
      setIsModalVisible(false);
  

      setEditId(null);
  

      message.success("Room updated successfully.");
    } catch (error) {
      console.error("Error updating room:", error);

      message.error("Failed to update room.");
    }
  };
  

  // Cancel edit
  const handleCancel = () => {
    setIsModalVisible(false);  
  };

  // Delete room
  const handleDelete = async (id) => {
    try {
      await api.delete(`/rooms/delete/${id}`);
      setRoomList((prev) => prev.filter((room) => room._id !== id));
      message.success("Room deleted successfully.");
    } catch (error) {
      console.error("Error deleting room:", error);
      message.error("Failed to delete room.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Add New Room Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add a New Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomName" className="block text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={roomData.roomName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter room name"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={roomData.capacity}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter room capacity"
            />
          </div>

          <div>
            <label htmlFor="features" className="block text-gray-700">
              Features
            </label>
            <input
              type="text"
              id="features"
              name="features"
              value={roomData.features}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Wi-Fi, Projector, Whiteboard"
            />
          </div>

          <div>
            <label htmlFor="pricePerHour" className="block text-gray-700">
              Price Per Hour
            </label>
            <input
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              value={roomData.pricePerHour}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter hourly rate"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={roomData.availability}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <label htmlFor="availability" className="ml-2 text-gray-700">
              Available
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Add Room
          </button>
        </form>
      </div>

      {/* Room List Table */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full bg-white rounded-lg shadow-lg table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Room Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">Price</th>
              <th className="px-6 py-4 text-center text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roomList.map((room) => (
              <tr key={room._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{room.roomName}</td>
                <td className="px-6 py-4">{room.capacity}</td>
                <td className="px-6 py-4">${room.pricePerHour}/hr</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEditClick(room._id, room)}
                    className="bg-blue-600 text-white px-2 rounded-md hover:bg-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <Popconfirm
                    title="Are you sure you want to delete this room?"
                    onConfirm={() => handleDelete(room._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Room Modal */}
      <Modal
        title="Edit Room"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <form>
          <div className="mb-4">
            <label htmlFor="roomName" className="block">Room Name</label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={editFormData.roomName}
              onChange={handleInputChange}
              className="block w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={editFormData.capacity}
              onChange={handleInputChange}
              className="block w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="features" className="block">Features</label>
            <input
              type="text"
              id="features"
              name="features"
              value={editFormData.features}
              onChange={handleInputChange}
              className="block w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pricePerHour" className="block">Price Per Hour</label>
            <input
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              value={editFormData.pricePerHour}
              onChange={handleInputChange}
              className="block w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={editFormData.availability}
              onChange={handleInputChange}
              className="h-5 w-5 text-green-600"
            />
            <label htmlFor="availability" className="ml-2">Available</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
