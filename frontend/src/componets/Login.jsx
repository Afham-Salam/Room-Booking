import React, { useEffect, useState } from "react";
import roomImage from "../assets/room.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../api";

export default function Login() {
  const navigate = useNavigate();
 


  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [UserId, setUserId] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        userData
      );

      setMessage(response.data.message);
     
      localStorage.setItem("token", response.data.token);
      const payload = JSON.parse(atob(response.data.token.split(".")[1]));
      localStorage.setItem("userId", payload.userId);
      
      
      

      // Redirect based on user role
      if (payload.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/users/me");
        setUserId(res.data);
        console.log("user Id:",UserId)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

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
        className="w-full h-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${roomImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative text-white w-full max-w-md bg-white bg-opacity-30 p-8 rounded-md shadow-lg backdrop-blur-lg backdrop-filter z-10">
          <p className="text-[40px] font-bold mb-6">Login to Your Account</p>
          <form className="flex flex-col space-y-3" onSubmit={handleLogin}>
            <label className="font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
              placeholder="Email"
              required
            />

            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                placeholder="Password"
                required
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center px-3 text-gray-500 hover:text-lime-600 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="mt-6 p-3 text-white hover:bg-[#238200] rounded-md bg-[#2A9E00]"
            >
              Login
            </button>
            {message && (
              <p className="text-center text-red-500 mt-4">{message}</p>
            )}
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
