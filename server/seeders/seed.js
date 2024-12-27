const db = require("../config/connection");
const { Doctor, Appointment } = require("../models");
const doctorSeeds = require("./doctorSeeds.json");
const appointmentSeeds = require("./appointmentSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Appointment", "appointments");
    await cleanDB("Doctor", "doctors");
    await Doctor.create(doctorSeeds);

    /*  for (let i = 0; i < appointmentSeeds.length; i++) {
      console.log("Creating appointment:", appointmentSeeds[i]);
      const { _id, doctorId } = await Appointment.create(appointmentSeeds[i]);
      const doctor =  await Doctor.findOneAndUpdate(
        doctorId,
        { $push: { appointments: _id } },
        { new: true }
      )
      if(!doctor){
        console.error(`no doctor with the id ${doctorId} found`)
      }
    } */
  } catch (error) {
    console.log("error during seeding", error);
    process.exit(1);
  }

  console.log("Seeding Done!");
  process.exit(0);
});
