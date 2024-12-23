import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight">
          Book Appointments <br /> With Trusted Doctors
        </p>
        <div className="flex flex-wrap gap-4">
          <img className="w-28" src={assets.group_profiles} alt="three icons" />
          <p className="text-white">
            Simply browse through our extensive list of doctors, <br />
            schedule your appointment hassle-free
          </p>
          <a
            className="book-btn flex gap-2 px-4 py-2 rounded-full bg-white hover:scale-105 transition-all duration-300"
            href="#speciality"
          >
            Book appointment{" "}
            <img className="w-3" src={assets.arrow_icon} alt="right arrow" />
          </a>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="three doctors"
        />
      </div>
    </div>
  );
};

export default Hero;
