import { gql } from "@apollo/client";

export const QUERY_DOCTORS = gql`
  query getDoctors {
    doctors {
      _id
      name
      email
      image
      speciality
      degree
      experience
      about
      available
      fees
      address_line_1
      address_line_2
      appointments {
        _id
        slot_date
        slot_month
        slot_time
      }
    }
  }
`;

// doctorsBySpeciality(speciality: String): [Doctor]
export const QUERY_DOCTORS_BY_SPECIALITY = gql`
  query getDoctorsBySpeciality($speciality: String) {
    doctorsBySpeciality(speciality: $speciality) {
      _id
      name
      image
      speciality
      degree
      experience
      available
    }
  }
`;

// doctor(_id: ID!): Doctor
export const QUERY_DOCTOR = gql`
  query getDoctor($_id: ID!) {
    doctor(_id: $_id) {
      _id
      name
      email
      image
      speciality
      degree
      experience
      about
      available
      fees
      address_line_1
      address_line_2
      appointments {
        _id
        slot_date
        slot_month
        slot_time
      }
    }
  }
`;
