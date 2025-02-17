import React, { useEffect, useState } from "react";
import { QUERY_DOCTORS_BY_SPECIALITY } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ doctorId, speciality }) => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_DOCTORS_BY_SPECIALITY, {
    variables: { speciality: speciality },
  });

  const doctors = data?.doctorsBySpeciality || [];

  const [relatedDocs, setRelatedDocs] = useState([]);

  // filter out selected doctor to not included in reltated doctors list
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doctor) => doctor._id !== doctorId);
      setRelatedDocs(doctorsData);
    }
  }, [doctors, speciality, doctorId]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center gap-4 my-16 md:mx-10">
      <p className="font-medium text-3xl">Related Doctors</p>
      <p>Simply brows through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {/* render a max of 5 relatedDoctors (hence the splice)*/}
        {relatedDocs.slice(0, 5).map((relatedDoc, index) => (
          <div
            onClick={() => {
              navigate(`/appointments/${relatedDoc._id}`);
              scrollTo(0, 0);
            }}
            className="border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img
              className="bg-blue-50"
              src={relatedDoc.image}
              alt="doctor photo"
            />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p
                  className={`${
                    relatedDoc.available ? "bg-green-600" : "bg-red-600"
                  } rounded-full w-2 h-2`}
                ></p>
                <p
                  className={`${
                    relatedDoc.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {relatedDoc.available ? "Available" : "Unavailable"}
                </p>
              </div>
              <p className="text-lg font-medium">{relatedDoc.name}</p>
              <p className="text-gray-600">{relatedDoc.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
