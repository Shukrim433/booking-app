import React from "react";
import { useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  console.log("speciality", speciality);
  return (
    <div>
      Doctors
      <p>hi</p>
    </div>
  );
};

export default Doctors;
