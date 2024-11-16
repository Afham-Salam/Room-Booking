import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserManagement() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", role: "" });

  const fetch = async () => {
    try {
      const res = await api.get("/users/all");
      setData(res.data.users); // Access the users array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleEditClick = (id, currentData) => {
    setEditId(id); 
    setEditFormData({ name: currentData.name, email: currentData.email, role: currentData.role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      
      await api.put(`/users/edit/${id}`, editFormData);

      // Update the UI after successful save
      setData((prevData) =>
        prevData.map((user) => (user._id === id ? { ...user, ...editFormData } : user))
      );
      setEditId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null); // Exit edit mode without saving
  };

  return (
    <div className="h-screen bg-gray-50">
      <p className="text-center text-3xl font-semibold m-7">All Users</p>
      <div className="p-4">
        <div className="overflow-x-auto flex justify-center">
          <table className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">Email</th>
                <th className="px-4 py-2 text-center text-sm border border-gray-300">Role</th>
                <th className="px-4 py-2 text-center text-sm border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  {/* Conditional rendering for Edit Mode */}
                  {editId === item._id ? (
                    <>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        <input
                          type="text"
                          name="role"
                          value={editFormData.role}
                          onChange={handleInputChange}
                          className="w-full p-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button
                          onClick={() => handleSave(item._id)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="ml-2 px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.name}</td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">{item.email}</td>
                      <td className="px-4 py-2 border border-gray-300 text-center text-sm">
                        {item.role}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button
                          onClick={() => handleEditClick(item._id, item)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
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
    </div>
  );
}
