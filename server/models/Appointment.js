const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slot_time: {
    type: String,
    required: true,
  },
  slot_date: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
