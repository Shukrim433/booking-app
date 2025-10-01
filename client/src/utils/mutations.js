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
  addUser(fullName: $fullName, email: $email, password: $password){
    token
      user {
      _id
      fullName 
    }
  }
}
`;
