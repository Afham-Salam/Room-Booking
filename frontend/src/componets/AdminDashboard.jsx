import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-0 lg:w-64 bg-[#2A9E00] text-white p-5 transition-all duration-300 ${
          sidebarOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <h2 className="text-2xl  font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/roomsmanagement" className="text-white hover:text-gray-200">
              Room Management
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/usermanagement" className="text-white hover:text-gray-200">
              User Management
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/bookingmanagement" className="text-white hover:text-gray-200">
              Booking Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-0 lg:ml-64 transition-all duration-300">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden mb-4 text-xl text-[#2A9E00] p-2 rounded-lg"
        >
          {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>

      
      </div>
    </div>
  );
};

export default AdminDashboard;
