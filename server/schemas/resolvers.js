const { User, Doctor, Appointment } = require("../models");
const { findOneAndUpdate } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    // users: [User]
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        console.log("error in users controller", error.message);
      }
    },
    // user(_id: ID!): User
    user: async (parent, { _id }) => {
      try {
        return await User.findOne({ _id });
      } catch (error) {
        console.log("error in user resolver:", error.message);
      }
    },
    // doctors: [Doctor]
    doctors: async () => {
      try {
        return await Doctor.find({});
      } catch (error) {
        console.log("error in doctors query", error.message);
      }
    },
    // doctorsBySpeciality(speciality: String!): [Doctor]
    doctorsBySpeciality: async (parent, { speciality }) => {
      const params = speciality ? { speciality } : {};
      try {
        return await Doctor.find(params);
      } catch (error) {
        console.log("error in speciality resolver:", error.message);
      }
    },
    // doctor(_id: ID!): Doctor
    doctor: async (parent, { _id }) => {
      try {
        return await Doctor.findOne({ _id }).populate("appointments");
      } catch (error) {
        console.log("error in doctor resolver", error.message);
      }
    },
    // appointments(userId: ID!): [Appointment]
    appointments: async (parent, { userId }, context) => {
      if (context.user) {
        try {
          const appointments = await Appointment.find({ userId }).populate(
            "doctorId"
          );
          return appointments;
        } catch (error) {
          console.log("error in appointments resolver:", error.message);
        }
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    // addUser(fullName: String!, email: String!, password: String!, gender: String, phone: String) : Auth
    addUser: async (parent, { fullName, email, password, gender, phone }) => {
      try {
        const user = await User.create({
          fullName,
          email,
          password,
          gender,
          phone,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("error in addUser resolver:", error.message);
      }
    },
    // login(email: String!, password: String!): Auth
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log("error in login resolver:", error.message);
      }
    },
    // addAppointment(doctorId: String!, slot_month: String!, slot_time: String!, slot_date: String!, reason: String!): Appointment
    addAppointment: async (
      parent,
      { doctorId, slot_month, slot_time, slot_date, reason },
      context
    ) => {
      if (context.user) {
        try {
          const appointment = await Appointment.create({
            doctorId,
            slot_month,
            slot_time,
            slot_date,
            reason,
            userId: context.user._id,
          });

          // update the doctor's appointment's array
          await Doctor.findByIdAndUpdate(
            doctorId,
            { $push: { appointments: appointment._id } } // push the new appointment ID into the array
          );
          return appointment;
        } catch (error) {
          console.log("error in addAppointment resolver:", error.message);
        }
      }
      throw AuthenticationError;
    },
    // cancelAppointment(appointmentId: String!): [Appointment]
    cancelAppointment: async (parent, { appointmentId }, context) => {
      if (context.user) {
        try {
          const appointment = await Appointment.findOne({ _id: appointmentId });
          await Doctor.findOneAndUpdate(
            { _id: appointment.doctorId },
            { $pull: { appointments: appointment._id } }
          );
          await Appointment.findOneAndDelete({
            _id: appointmentId,
          });

          const appointments = await Appointment.find({});

          return appointments;
        } catch (error) {
          console.log("error in cancelAppointment resolver:", error.message);
        }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
