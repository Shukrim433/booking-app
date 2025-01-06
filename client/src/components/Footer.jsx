import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-10 text-gray-600">
      {/* TOP */}
      <div className="flex flex-col sm:grid grid-cols-[4fr_1fr_1fr] gap-14 my-10 mt-40">
        {/* LEFT */}
        <div>
          <img className="mb-3 w-40" src={assets.logo} alt="logo icon" />

          <p className="text-sm leading-6 w-full md:w-2/3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* MIDDLE */}
        <div>
          <h1 className="font-medium mb-3">COMPANY</h1>
          <ul className="cursor-pointer text-sm flex flex-col gap-2">
            <li className="hover:text-black" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="hover:text-black" onClick={() => navigate("/about")}>
              About us
            </li>
            <li
              className="hover:text-black"
              onClick={() => navigate("/contact")}
            >
              Contact us
            </li>
            <li className="hover:text-black">Privacy policy</li>
          </ul>
        </div>
        {/* RIGHT */}
        <div>
          <h1 className="font-medium mb-3">GET IN TOUCH</h1>
          <ul className="text-sm flex flex-col gap-2">
            <li>+1-272-555-7890</li>
            <li>docday@email.com</li>
          </ul>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="text-center py-4 text-sm mt-10 border-t-2">
        <p>Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
