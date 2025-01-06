import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import Profile from "./icons/Profile";
import ChevronDown from "./icons/ChevronDown";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <NavLink to="/">
        <img className="w-44 ml-3 cursor-pointer" src={assets.logo} alt="logo" />
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
        {Auth.loggedIn() ? (
          <>
            <div className="flex items-center gap-2 cursor-pointer group relative">
              {/* PROFILE ICON */}
              <div>
                <Profile />
              </div>
              {/* DROPDOWN ICON */}
              <div>
                <ChevronDown />
              </div>
              {/* DROP DOWN MENU - ON HOVER */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 flex flex-col gap-4 dropdown bg-slate-100 p-4 rounded-lg ">
                  <p
                    onClick={() => navigate("/myAppointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
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
