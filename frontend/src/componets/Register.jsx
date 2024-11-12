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
        className="w-full lg:w-full h-full lg:h-screen bg-cover bg-center absolute lg:relative"
        style={{
          backgroundImage: `url(${roomImage})`,
        }}
      >
        <div className="w-full h-full flex  items-center justify-center  lg:bg-none bg-opacity-90 p-8 lg:relative z-10">
          <div className="w-full max-w-md bg-white bg-opacity-30 p-8 rounded-md shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-[40px] font-bold mb-6">Create an account</p>
            <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
              <label className="font-medium">Enter Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Name"
                required
              />

              <label className="font-medium">Enter Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Email"
                required
              />

              <label className="font-medium">Enter Password</label>
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
                className="mt-6 p-3 hover:text-white border-2 border-[#2A9E00] text-green-600 rounded-md hover:bg-[#2A9E00]"
              >
                Sign Up
              </button>
              {message && (
                <p className="text-center text-red-500 mt-4">{message}</p>
              )}
              <p className="text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-600">
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
