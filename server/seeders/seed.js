const db = require("../config/connection");
const { Doctor } = require("../models");
const doctorSeeds = require("./doctorSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Doctor", "doctors");
    await Doctor.create(doctorSeeds);
  } catch (error) {
    console.log("error during seeding", error);
    process.exit(1);
  }

  console.log("Seeding Done!");
  process.exit(0);
});
