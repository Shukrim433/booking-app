import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_DOCTORS } from "../../utils/queries";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_DOCTORS);
  const doctors = data?.doctors || [];

  if (!doctors.length) {
    return <div>no doctors</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {loading ? (
          <div>loading...</div>
        ) : (
          doctors.slice(0, 10).map((doctor) => (
            <div
              onClick={() => navigate(`doctor/${doctor._id}`)}
              className="border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 "
              key={doctor._id}
            >
              <img
                className="bg-blue-50 rounded-t-lg"
                src={doctor.image}
                alt="doctor photo"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-green-600">
                  <p className="w-2 h-2 bg-green-600 rounded-full"></p>{" "}
                  <p>{doctor.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-lg font-medium">{doctor.name}</p>
                <p className="text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="bg-blue-100 text-gray-800 px-14 py-3 rounded-full mt-10">
        more
      </button>
    </div>
  );
};

export default TopDoctors;