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
    setEditFormData({
      roomName: currentData.roomName,
      capacity: currentData.capacity,
      features: currentData.features,
      pricePerHour: currentData.pricePerHour,
      availability: currentData.availability,
    });
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
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a New Room
        </h2>
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
                          onClick={() => handleSave(room._id)} // Save edited room
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fill="none"
                              stroke="green"
                              d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleCancel} // Cancel editing
                          className="md:pl-2 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="black"
                              d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                            />
                          </svg>
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
                        <button onClick={() => handleEditClick(room._id, room)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="blue"
                              d="M18.925 3.137a3.027 3.027 0 0 0-4.283.001l-9.507 9.52a3.03 3.03 0 0 0-.885 2.139V18c0 .414.336.75.75.75h3.223c.803 0 1.573-.32 2.14-.887l9.5-9.506a3.03 3.03 0 0 0 0-4.28zM4 20.25a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="md:pl-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="red"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                            />
                          </svg>
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
