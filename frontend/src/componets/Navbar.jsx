import React, { useState } from "react";
import { navitems } from "../utils/data";
import { NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./Mobilemenu";

export default function Navbar() {
  const navigate = useNavigate(); // Correct usage of useNavigate

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirects to the home or login page after logout
  };

  const [menu, setMenu] = useState(false);

  return (
    <div className="flex items-center justify-between w-full h-[70px] relative z-[100] shadow-md px-4 md:px-6 lg:px-10">
      {/* Mobile Menu Toggle and Logo */}
      <div className="flex items-center w-full lg:w-auto">
        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <svg
            onClick={() => setMenu(!menu)}
            className="text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            {!menu ? (
              <path
                fill="#2A9E00"
                d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
              />
            ) : (
              <path
                fill="#2A9E00"
                d="M18.3 5.71L12 12.01 5.7 5.71 4.29 7.12l6.3 6.3-6.3 6.3 1.42 1.41 6.3-6.3 6.29 6.3 1.42-1.41-6.3-6.3 6.3-6.3z"
              />
            )}
          </svg>
          {menu && <MobileMenu />}
        </div>

        {/* Logo */}
        <div className="flex-grow lg:flex-grow-0 p-4">
          <p className="text-[20px] md:text-[25px] font-bold tracking-widest">
            <span className="text-[#2A9E00]">Book</span>a
            <span className="text-[#2A9E00]">Room</span>
          </p>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex gap-8 items-center">
        {navitems.map((it) => (
          <NavLink
            to={it.path}
            key={it.label}
            className="text-[#2A9E00] font-bold"
          >
            {it.label}
          </NavLink>
        ))}
      </div>

      {/* Profile Icon */}
      <div
        onClick={logout}
        className="flex items-center gap-4 ml-auto lg:ml-0 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7.023 5.5a9 9 0 1 0 9.953 0M12 2v8"
            color="black"
          />
        </svg>
      </div>
    </div>
  );
}
