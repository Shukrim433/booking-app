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
    street: String!
    city: String!
    postcode: String!
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
  }
`;

module.exports = typeDefs;
