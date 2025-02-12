import React, { useEffect, useState } from "react";
import { QUERY_DOCTORS_BY_SPECIALITY } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const RelatedDoctors = ({ doctorId, speciality }) => {
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
    <div>
      <p>Related Doctors</p>
      <p>Simply brows through our extensive list of trusted doctors.</p>
      <div>
        {relatedDocs.map((relatedDoc, index) => (
          <div key={index}>
            <img src={relatedDoc.image} alt="doctor photo" />
            <div>
              <p></p>
              <p>{relatedDoc.available}</p>
            </div>
            <p>{relatedDoc.name}</p>
            <p>{relatedDoc.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
