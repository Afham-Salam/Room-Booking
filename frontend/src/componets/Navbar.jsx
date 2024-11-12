import React, { useState } from "react";
import { navitems } from "../utils/data";
import { NavLink } from "react-router-dom";
import MobileMenu from "./Mobilemenu";

export default function Navbar() {
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
          <p className="text-[20px] md:text-[25px] font-semibold tracking-widest">
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
      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 512 512"
        >
          <path
            fill="#2A9E00"
            fillRule="evenodd"
            d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 
            117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"
          />
        </svg>
      </div>
    </div>
  );
}
