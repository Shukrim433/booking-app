import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_DOCTORS_BY_SPECIALITY } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { loading, data } = useQuery(QUERY_DOCTORS_BY_SPECIALITY, {
    variables: { speciality: speciality },
  });

  const doctors = data?.doctorsBySpeciality || [];

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <p>Browse through these specialities</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* LEFT */}
        <div className="flex flex-col gap-4 text-sm">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "General physician" ? "bg-indigo-100" : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrician")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "Pediatrician" ? "bg-indigo-100" : ""
            }`}
          >
            Pediatrician
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto border rounded-lg pl-3 py-1.5 pr-16 hover:border-black cursor-pointer ${
              speciality === "Gastroenterologist" ? "bg-indigo-100" : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        {/* RIGHT */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0 cursor-pointer">
          {doctors.map((doctor) => (
            <div
              onClick={() => navigate(`/appointments/${doctor._id}`)}
              className="flex flex-col hover:translate-y-[-10px] transition-all duration-500"
              key={doctor._id}
            >
              <img
                className="bg-blue-50 border rounded-t-lg"
                src={doctor.image}
                alt="doctor's photo"
              />
              <div className="px-4 py-2 border-x border-b rounded-b-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 border rounded-full "></div>{" "}
                  <p className="text-green-600">
                    {doctor.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <p className="text-lg font-medium">{doctor.name}</p>
                <p className="text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
