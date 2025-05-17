import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-3xl mt-4 mb-14">
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </h1>

      <div className="flex flex-col xl:flex-row gap-8 items-center">
        {/* LEFT/TOP */}
        <div>
          <img  src="/photos/about_image.png" alt="sock photo of two doctors" />
        </div>
        {/* RIGHT/BOTTOM */}
        <div className="flex flex-col gap-6 w-full text-left text-slate-700 px-10">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <p className="font-bold">Our Vision</p>

          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <h2 className="text-center xl:text-left text-xl mt-20 mb-8"><Title text1={"WHY"} text2={"CHOOSE US"}/></h2>

      <div className="flex flex-col xl:flex-row">
        {/* BOX 1 */}
        <div className="flex flex-col text-left gap-4 cursor-pointer hover:bg-gray-100 p-10  xl:p-16 border-t xl:border-b border-l border-r xl:border-r-0 border-slate-700">
        <p className="font-medium" >EFFICIENCY:</p>
          <p className="text-slate-700 text-sm w-2/3">
          Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>
        {/* BOX 2 */}
        <div className="flex flex-col text-left gap-4 cursor-pointer hover:bg-gray-100 p-10 xl:p-16 border-t xl:border-b border-l border-r xl:border-r-0 border-slate-700">
        <p className="font-medium" >CONVENIENCE:</p>
          <p className="text-slate-700 text-sm w-2/3">
          Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>
        {/* BOX 3 */}
        <div className="flex flex-col text-left gap-4 cursor-pointer hover:bg-gray-100 p-10 xl:p-16 border-t border-b border-l border-r border-slate-700">
        <p className="font-medium" >PERSONALISATION:</p>
          <p className="text-slate-700 text-sm w-2/3">
          Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
