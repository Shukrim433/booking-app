import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <NavLink to="/">
        <h1 className="text-lg font-bold text-primary cursor-pointer">
          <span>
            <img className="w-44 ml-3" src={assets.logo} alt="logo" />
          </span>
          Docday
        </h1>
      </NavLink>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 ">Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 ">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 ">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {!Auth.loggedIn() ? (
          <>
            <div className="flex items-center gap-2 cursor-pointer group relative">
              {/* PROFILE ICON */}
              <div className=" ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              {/* DROPDOWN ICON */}
              <div className="">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              {/* DROP DOWN MENU - ON HOVER */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 flex flex-col gap-4 dropdown bg-slate-100 p-4 rounded-lg ">
                  <p className="hover:text-black cursor-pointer">
                    My appointments
                  </p>
                  <p className="hover:text-black cursor-pointer">Logout</p>
                </div>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-primary px-8 py-3 rounded-full text-white hidden md:block"
            >
              Join us
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
