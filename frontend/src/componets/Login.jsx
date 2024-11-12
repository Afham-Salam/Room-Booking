import React, { useState } from "react";
import roomImage from "../assets/room.jpg";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', userData);
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate("/home")
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Login failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
   <>
    <div className=" h-screen">
      
      {/* Form Section with Background on Medium and Small Screens */}
      <div 
        className="w-full lg:w-full h-full flex items-center justify-center bg-white lg:bg-none bg-cover bg-center"
        style={{
          backgroundImage: `url(${roomImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white bg-opacity-30 p-8 rounded-md shadow-lg backdrop-blur-lg backdrop-filter">
          <p className="text-[40px] font-bold mb-6">Login to Your Account</p>
          <form className="flex flex-col  space-y-3" onSubmit={handleLogin}>
            <label className="font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
              placeholder="Email"
              required
            />

            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="mt-6 p-3 text-white   hover:bg-[#238200] rounded-md bg-[#2A9E00]"
            >
              Login
            </button>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
            <p className="text-center">
              Don't have an account? <Link to={"/register"} className="text-blue-600">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>


     
    </div></>
  );
}
