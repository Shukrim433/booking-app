import React from "react";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 ">
      <h1 className="text-3xl mt-4 mb-14">
        <Title text1={"CONTACT"} text2={"US"} />
      </h1>

      <div className="flex flex-col md:flex-row gap-10 px-10 justify-center items-center">
        {/* LEFT/TOP */}
        <img
          className="md:w-1/2"
          src="/photos/contact_image.png"
          alt="contact image"
        />
        {/* RIGHT/BOTTOM */}
        <div className="text-slate-700 text-center md:text-left">
          <p className="text-xl font-semibold mb-4">OUR OFFICE</p>
          <p className="mb-6">
            5009 Thomas Station <br />
            Suite 35, London, England
          </p>
          <p className="mb-6">
            Tel: (415) 555‑0132 <br />
            Email: greatstackdev@gmail.com
          </p>
          <p className="text-xl font-semibold mb-4"> CAREERS AT DOCDAY</p>
          <p className="mb-6">Learn more about our teams and job openings.</p>

          <button
            className="px-4 py-2 border border-gray-700 hover:cursor-pointer"
            disabled
          >
            {" "}
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
