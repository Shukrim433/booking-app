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
