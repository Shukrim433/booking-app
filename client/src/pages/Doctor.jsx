import React from "react";
import { QUERY_DOCTOR } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CheckBadge from "../components/icons/CheckBadge";
import InfoCircle from "../components/icons/InfoCircle";

const Doctor = () => {
  const { doctorId } = useParams();
  const { loading, error, data } = useQuery(QUERY_DOCTOR, {
    variables: { _id: doctorId },
  });

  const doctor = data?.doctor || {};

  if (!doctor) {
    console.log("no doc from QUERY_DOC");
  }
  return (
    <div>
      {/* DOCTOR DETAILS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* LEFT */}
        <div>
          <img
            className="bg-primary rounded-lg w-full sm:max-w-72"
            src={doctor.image}
            alt="doctor's photo"
          />
        </div>
        {/* RIGHT */}
        <div className="flex-1 border rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-white mt-[-80px] sm:mt-0">
          <p className="flex gap-2 items-center text-2xl font-medium">
            {doctor.name}{" "}
            <span>
              <CheckBadge />
            </span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p>{doctor.degree}</p> - <p>{doctor.speciality}</p>{" "}
            <p className="border rounded-full w-20 text-center px-2 py-0.5">
              {doctor.experience}
            </p>
          </div>
          <div className="mt-5">
            <p className="flex gap-2 items-center text-sm font-medium">
              About{" "}
              <span>
                <InfoCircle />
              </span>
            </p>
            <p className="mt-1">{doctor.about}</p>
          </div>
          <p className="mt-5 font-medium">
            Appointment fee:{" "}
            <span className="font-semibold">£{doctor.fees}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
