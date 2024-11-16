import React from "react";
import { navitems } from "../utils/data";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#C7E3BE]  font-semibold p-8 md:p-12 border-t-2">
      <div className=" mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Brand Section */}
        <aside className=" md:text-left">
          <p className="text-[20px] md:text-[25px] text-black font-semibold tracking-widest">
            <span className="text-[#2A9E00]">Book</span>a
            <span className="text-[#2A9E00]">Room</span>
          </p>
          <p className="mt-2 text-gray-700">
            Book Your Room
          </p>
        </aside>

        {/* Navigation Links */}
        <aside className="text-center md:text-left">
          <ul className="flex flex-col items-start md:items-start gap-4">
            {navitems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-black hover:text-[#2A9E00] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Social Media Links */}
        <nav className=" md:text-left">
          <h6 className="text-lg text-black font-semibold mb-4">
            Connect with us
          </h6>
          <div className="flex  md:justify-start gap-4">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-[#2A9E00] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="hover:text-[#2A9E00] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-[#2A9E00] transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-black pt-4 text-center text-black">
        <p>© 2024 Book Mingle. All rights reserved.</p>
      </div>
    </footer>
  );
}
