import React, { useState } from "react";
import roomImage from "../assets/room.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
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
      console.log(userData);
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

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center absolute"
        style={{
          backgroundImage: `url(${roomImage})`,
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-60 p-4 md:p-8">
          <div className="w-full  max-w-md bg-white bg-opacity-30 p-6  md:p-8 rounded-md shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-2xl md:text-4xl font-bold mb-4 text-center text-white">
              Create an account
            </p>
            <form
              className="flex flex-col lg:space-y-4 space-y-2 md:space-y-1"
              onSubmit={handleRegister}
            >
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

              <label className="font-medium text-white">Password</label>
              <input
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="mt-4 p-3 text-white bg-[#2A9E00] hover:bg-[#238200] rounded-md w-full"
              >
                Sign Up
              </button>
              {message && (
                <p className="text-center text-red-500 mt-4">{message}</p>
              )}
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
