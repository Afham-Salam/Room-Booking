import React, { useEffect, useState } from "react";
import api from "../api";

export default function UserManagement() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/users/all");
        setData(res.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  const handleEditClick = (id, currentData) => {
    setEditId(id);
    setEditFormData({
      name: currentData.name,
      email: currentData.email,
      role: currentData.role,
    });
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
        prevData.map((user) =>
          user._id === id ? { ...user, ...editFormData } : user
        )
      );
      setEditId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null); // Exit edit mode without saving
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
    if (!isConfirmed) return; 
    try {
      await api.delete(`/users/delete/${id}`);
      setRoomList((prev) => prev.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      <p className="text-center text-3xl font-semibold m-7">All Users</p>
      <div className="p-4">
        <div className="overflow-x-auto flex justify-center">
          <table className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-center text-sm border border-gray-300">
                  Role
                </th>
                <th className="px-4 py-2 text-center text-sm border border-gray-300">
                  Action
                </th>
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
                        <button onClick={() => handleSave(item._id)}>
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
                        <button onClick={handleCancel} className="md:pl-2 ">
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
                        {item.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        {item.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center text-sm">
                        {item.role}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button onClick={() => handleEditClick(item._id, item)}>
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
                          onClick={() => handleDelete(item._id)}
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
    </div>
  );
}
