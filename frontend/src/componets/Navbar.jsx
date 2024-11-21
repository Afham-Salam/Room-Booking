import React, { useEffect, useState } from "react";
import { navitems } from "../utils/data";
import { NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./Mobilemenu";
import { Drawer, Button } from "antd"; 
import { IoPersonSharp } from "react-icons/io5";
import api from "../api";

export default function Navbar() {
  const navigate = useNavigate(); 
  const [menu, setMenu] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); 
  const [userData, setUserData] = useState([]); 

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  const showDrawer = () => {
    setDrawerVisible(true); 
  };

  const onClose = () => {
    setDrawerVisible(false); 
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/users/me");
        console.log("user:",res.data)
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex items-center justify-between w-full h-[70px] relative z-[100] shadow-md px-4 md:px-6 lg:px-10">
      
      <div className="flex items-center w-full lg:w-auto">
        
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

        
        <div className="flex-grow lg:flex-grow-0 p-4">
          <p className="text-[20px] md:text-[25px] font-bold tracking-widest">
            <span className="text-[#2A9E00]">Book</span>a
            <span className="text-[#2A9E00]">Room</span>
          </p>
        </div>
      </div>

      
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

      
      <div className="flex items-center gap-2 ml-auto lg:ml-0 cursor-pointer">
        
        <Button
          type="link"
          onClick={showDrawer}
          className="text-[#2A9E00] hover:text-black font-bold text-[24px]"
        >
          <IoPersonSharp />
        </Button>

        
        <svg
          onClick={logout}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7.023 5.5a9 9 0 1 0 9.953 0M12 2v8"
            color="black"
          />
        </svg>
      </div>

      <Drawer
        title="My Profile"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        width={300} 
      >
        
       
        {userData && (
         <>
         <p>
         Name: {userData?.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : "N/A"}
         </p>
         <p className="mt-10">Email: {userData.email}</p>
       </>
       
        )}
       
        
       
      </Drawer>
    </div>
  );
}
