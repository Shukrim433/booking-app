# DocDay

## Challenges

- Route Conflict:
  - My "/doctors/:speciality" route was mounting the <Doctor/> component rather than the <Doctors/> component and it was due to a route conflict
  - In my Main.jsx I defined my "/doctors/:doctorId" route before my "doctors/:speciality" route.
  - So the router was incorrectly matching the wrong route, causing the <Doctor/> component display.
  - This confusion occurs because - **React Router matches routes in the order they are defined**. And since "/doctors/:doctorId" is more generic (it matches any single segment after "/doctors/"), it was taking precedence over "/doctors/:speciality"
  - **SOLUTION**: By defining "/doctors/:speciality" before "/doctors/:doctorId" in my Main.jsx, the React Router tries to match "/doctors/:speciality" first. If no match is found, it falls back to "/doctors/:doctorId".
  - **LESSON LEARNED**: In React Router, more specific routes must be defined before more generic ones to avoid incorrect matches.
