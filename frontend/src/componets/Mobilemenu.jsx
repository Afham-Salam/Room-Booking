import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navitems } from "../utils/data";

export default function MobileMenu() {
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  return (
    <div>
      {isMenuOpened && (  
        <div
          className="bg-white w-full md:w-screen absolute top-[70px] left-0"
          id="menu"
        >
          <ul className="flex flex-col md:gap-5 md:p-4 gap-10 text-[12px] p-3">
            {navitems.map((it) => (
              <li key={it.key} className="text-[#ad5051] font-bold">
                <NavLink to={it.path} onClick={closeMenu}>
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}