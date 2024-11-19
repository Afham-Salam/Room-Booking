import React, { useState } from "react";
import roomImage from "../assets/room.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "Registration failed"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center absolute"
        style={{
          backgroundImage: `url(${roomImage})`,
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-60 p-4 md:p-8">
          <div className="w-full max-w-md bg-white bg-opacity-30 p-6 md:p-8 rounded-md shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-2xl md:text-4xl font-bold mb-4 text-center text-white">
              Create an account
            </p>
            <form
              className="flex flex-col lg:space-y-4 space-y-2 md:space-y-1"
              onSubmit={handleRegister}
            >
              {/* Full Name Input */}
              <label className="font-medium text-white">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Name"
                required
              />

              {/* Email Address Input */}
              <label className="font-medium text-white">Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Email"
                required
              />

              {/* Password Input with Show/Hide Functionality */}
              <label className="font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type based on showPassword state
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-lime-600 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 p-3 text-white bg-[#2A9E00] hover:bg-[#238200] rounded-md w-full"
              >
                Sign Up
              </button>

              {/* Error/Success Message */}
              {message && (
                <p className="text-center text-red-500 mt-4">{message}</p>
              )}

              {/* Login Redirect */}
              <p className="text-center text-white mt-2">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-400 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
