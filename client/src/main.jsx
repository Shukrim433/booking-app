import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import "./index.css";

import App from "./App.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Doctors from "./pages/Doctors.jsx";
import Doctor from "./pages/Doctor.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      error: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/doctors",
          element: <Doctors />,
        },
        {
          path: "/doctors/:doctorId",
          element: <Doctor />,
        },
        {
          path: "/doctors/:speciality",
          element: <Doctors />,
        },
        {
          path: "/myAppointments",
          element: <MyAppointments />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    future={{
      v7_startTransition: true,
    }}
    router={router}
  />
);
