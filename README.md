# DocDay

## Challenges

- Route Conflict:
  - My "/doctors/:speciality" route was mounting the <Doctor/> component rather than the <Doctors/> component and it was due to a route conflict
  - In my Main.jsx I defined my "/doctors/:doctorId" route before my "doctors/:speciality" route.
  - So the router was incorrectly matching the wrong route, causing the <Doctor/> component display.
  - This confusion occurs because - **React Router matches routes in the order they are defined**. And since "/doctors/:doctorId" is more generic (it matches any single segment after "/doctors/"), it was taking precedence over "/doctors/:speciality"
  - **SOLUTION**: By defining "/doctors/:speciality" before "/doctors/:doctorId" in my Main.jsx, the React Router tries to match "/doctors/:speciality" first. If no match is found, it falls back to "/doctors/:doctorId".
  - **LESSON LEARNED**: In React Router, more specific routes must be defined before more generic ones to avoid incorrect matches.


- Explanation of **getAvailableSlots** function:
  const getAvailableSlots = async () => {
    // Clears previous slots before generating new ones for the selected doctor.
    setDocSlots([]);

    // Creates a new Date object representing the current date and time.
    const today = new Date();

    // Generate slots for the next 7 days.
    for (let i = 0; i < 7; i++) {
      // Creates a new date object (called currentDate) for each day in the next 7 days. by adding i days to today.
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Creates a new date object (called endTime) for each day in the next 7 days.by adding i days to today.
      // Then sets the day's max hours - so 9pm is the latest possible appointment slot
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // If the current iteration's day is today:
      if (today.getDate() === currentDate.getDate()) {
        // First available slot is current time + 1 hour, but not earlier than 10 AM.
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );

        // If current minutes are > 30, first slot is at hh:30; otherwise, it's at hh:00.
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, the first slot starts at 10:00 AM.
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // create an empty array to store available slots for the current day.
      let timeSlots = [];
      // Runs a loop to generate slots until currentDate reaches endTime.
      while (currentDate < endTime) {
        // Formats the time into a readable string (e.g., "10:30 AM").
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // increment time by 30 minutes (to generate each time slot from current time to end time)
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      // Updates docSlots state by appending the new day's slots.
      // Uses a functional state update (prev => [...prev, timeSlots]) to avoid overwriting previous state.
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };