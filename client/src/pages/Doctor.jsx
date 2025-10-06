import React, { useEffect, useState } from "react";
import { QUERY_DOCTOR } from "../utils/queries";
import { BOOK_APPOINTMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CheckBadge from "../components/icons/CheckBadge";
import InfoCircle from "../components/icons/InfoCircle";
import RelatedDoctors from "../components/RelatedDoctors";

const Doctor = () => {
  const { doctorId } = useParams();
  const [docSlots, setDocSlots] = useState([]);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const { loading, error, data } = useQuery(QUERY_DOCTOR, {
    variables: { _id: doctorId },
  });
  const doctor = data?.doctor || {};

  // STARTED APPT BOOKING FUNCTIONALITY HERE---
  const [addAppointment, { error: apptError }] = useMutation(BOOK_APPOINTMENT);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addAppointment({
        variables: {
          doctorId: doctorId,
          slot_month: "NEED TO ADD",
          slot_time: "NEED TO ADD",
          slot_date: "NEED TO ADD",
          reason: "NEED TO ADD",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // END OF APPT BOOKING FUNCTIONALITY HERE---

  const getAvailableSlots = async () => {
    setDocSlots([]);

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // latest slot = 9pm
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        // first slot of today = current time + 1 hour
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        // if current time's mins is > 30 first slot's mins = hh:00 else hh:30
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // first slot of future days = 10 am
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      // create an empty array to store available slots for the current day
      let timeSlots = [];

      // Runs a loop to generate slots until currentDate reaches endTime.
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        // increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // Updates docSlots state by appending the new day's slots.
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [doctor]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (loading) return <div>loading...</div>;
  return (
    <div>
      {/* DOCTOR DETAILS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* LEFT - DR IMAGE */}
        <div>
          <img
            className="bg-primary rounded-lg w-full sm:max-w-72"
            src={doctor.image}
            alt="doctor's photo"
          />
        </div>
        {/* RIGHT - DR INFO*/}
        <div className="shadow flex-1 border rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-white mt-[-80px] sm:mt-0">
          <p className="flex gap-2 items-center text-2xl font-medium">
            {doctor.name}{" "}
            <span>
              <CheckBadge />
            </span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p>{doctor.degree}</p> - <p>{doctor.speciality}</p>{" "}
            <p className="border rounded-full w-20 text-center px-2 py-0.5">
              {doctor.experience}
            </p>
          </div>
          <div className="mt-5">
            <p className="flex gap-2 items-center text-sm font-medium">
              About{" "}
              <span>
                <InfoCircle />
              </span>
            </p>
            <p className="mt-1">{doctor.about}</p>
          </div>
          <p className="mt-5 font-medium">
            Appointment fee:{" "}
            <span className="font-semibold">£{doctor.fees}</span>
          </p>
        </div>
      </div>
      {/* SLOTS */}
      <div className="sm:ml-72 sm:pl-4 font-medium mt-10">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {/* when you onClick a day it will set the slotIndex state and highlight the selected day */}
          {docSlots.length &&
            docSlots.map((slot, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex flex-col text-center cursor-pointer text-sm min-w-16 border rounded-full py-6 ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</p>
                <p>{slot[0] && slot[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center w-full mt-4 gap-3 overflow-x-scroll ">
          {/* when you onClick a time slot it will set the timeSlot state and highlight the selected day */}
          {docSlots.length &&
            docSlots[slotIndex].map((slot, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(slot.time)}
                className={`text-sm flex-shrink-0 cursor-pointer rounded-full px-4 py-2 text-center ${
                  slot.time === slotTime
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button onClick={handleClick} className="bg-primary text-white font-light rounded-full px-14 py-2  cursor-pointer my-8">
          Book appointment
        </button>
      </div>

      {/*  Related Doctors */}
      <RelatedDoctors doctorId={doctorId} speciality={doctor.speciality} />
    </div>
  );
};

export default Doctor;
