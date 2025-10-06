import { gql } from "@apollo/client";

// login(email: String!, password: String!): Auth
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

// addUser(fullName: String!, email: String!, password: String!) : Auth
export const SIGNUP_USER = gql`
  mutation addUser($fullName: String!, $email: String!, $password: String!) {
    addUser(fullName: $fullName, email: $email, password: $password) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

// addAppointment(doctorId: String!, slot_month: String!, slot_time: String!, slot_date: String!, reason: String!): Appointment
export const BOOK_APPOINTMENT = gql`
  mutation addAppointment(
    $doctorId: String!
    $slot_month: String!
    $slot_time: String!
    $slot_date: String!
    $reason: String!
  ) {
    addAppointment(
      doctorId: $doctorId
      slot_month: $slot_month
      slot_time: $slot_time
      slot_date: $slot_date
      reason: $reason
    ) {
      _id
      doctorId
      slot_month
      slot_time
      slot_date
    }
  }
`;
