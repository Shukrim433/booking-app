const typeDefs = `
  type User {
    _id: ID
    fullName: String!
    email: String!
    password: String!
    gender: String
    phone: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Doctor {
    _id: ID
    name: String!
    email: String!
    password: String!
    image: String!
    speciality: String!
    degree: String!
    experience: String!
    about: String!
    available: Boolean!
    fees: String!
    address_line_1: String!
    address_line_2: String!
  }

  type Appointment {
    _id: ID
    doctorId: ID!
    userId: ID!
    slot_time: String!
    slot_date: String!
    reason: String!
    createdAt: String
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    doctors: [Doctor]
    doctor(_id: ID!): Doctor
  }

  type Mutation {
    addUser(
      fullName: String!,
      email: String!,
      password: String!,
      gender: String,
      phone: String
    ): Auth
    login(email: String!, password: String!): Auth
    addAppointment(doctorId: ID!, slot_time: String!, slot_date: String!, reason: String!): Appointment
  }
`;

module.exports = typeDefs;
