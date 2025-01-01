import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 bg-primary px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 rounded-lg">
      {/* LEFT */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium text-white">
          {" "}
          <h1>Book Appointment</h1>
          <h1 className="mt-4">With 100+ Trusted Doctors</h1>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-8 bg-white border rounded-full px-6 py-3 text-md hover:scale-105 transition-all duration-500"
        >
          Create account
        </button>
      </div>
      {/* RIGHT */}
      <div className="hidden md:block  md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="woman pointing"
        />
      </div>
    </div>
  );
};

export default Banner;
