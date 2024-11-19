import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { dashboardcard } from "../utils/data";
import api from "../api";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomLen, setRoomLen] = useState(0);
  const [userLen, setUserLen] = useState(0);
  const [bookingLen, setBookingLen] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users/all");
        setUserLen(res.data.users.length-1);
        console.log(res.data.users.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all");
        setRoomLen(res.data.length);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get("/bookings/all");
        setBookingLen(res.data.length);
        console.log(res.data.length)
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchBooking();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#2A9E00] text-white p-5 transition-transform duration-300 z-40
          ${
            sidebarOpen
              ? "translate-x-0 top-[72px] lg:top-0"
              : "-translate-x-full lg:translate-x-0 top-[72px] lg:top-0"
          }
          lg:relative lg:translate-x-0 lg:w-64`}
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-0 right-4  text-2xl text-white focus:outline-none"
        >
          <FiX />
        </button>

        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link
              to="roomsmanagement"
              className="text-white hover:bg-gray-200 hover:text-[#2A9E00] block px-3 py-2 rounded-lg transition"
            >
              Room Management
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="usermanagement"
              className="text-white hover:bg-gray-200 hover:text-[#2A9E00] block px-3 py-2 rounded-lg transition"
            >
              User Management
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="bookingmanagement"
              className="text-white hover:bg-gray-200 hover:text-[#2A9E00] block px-3 py-2 rounded-lg transition"
            >
              Booking Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Backdrop for small screens */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}

      <div className="flex-1 p-8 transition-all duration-300">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 text-2xl text-[#2A9E00] p-2 rounded-lg focus:outline-none"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        <p className="text-3xl font-bold text-[#2A9E00]">
          Welcome to Admin Dashboard
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {dashboardcard.map((it) => (
            <div key={it.key} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#2A9E00]">
                {it.name}
              </h3>
              <p className="text-2xl font-bold text-gray-700 mt-2">
                {it.count === "rooms"
                  ? roomLen
                  : it.count === "users"
                  ? userLen
                  : bookingLen}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
