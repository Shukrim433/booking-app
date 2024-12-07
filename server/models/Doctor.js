const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    fees: {
      type: String, // change type to number when creating doc login - see wireframe to understand
      require: true,
    },
    address_line_1: {
      // change these three to a single field: address - type: Object - when creating doctor login
      type: String,
      require: true,
    },
    address_line_2: {
      type: String,
      require: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
      }
    ]
  },
  { minimize: false }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
