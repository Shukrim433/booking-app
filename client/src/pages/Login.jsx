import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_USER);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    // update form based on user inputs
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // pass variables into login mutation function:
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token); // login user with the token returned from the mutation
      setFormState({ email: "", password: "" }); // clear the form
    } catch (e) {
      console.error(e); //TRIED PUTTING TOAST HERE BUT NEED TO FIGURE OUT HOW TO GET MESSAGE TO BE ACCURATE
    }
  };

  return (
    <div className="flex items-center justify-center  text-slate-800 py-8">
      {/* CONTAINER */}
      <div className="flex flex-col border rounded-lg w-2/3 shadow-md px-10 py-10">
        <p className="font-medium text-2xl mb-1">Login</p>
        <p className="mb-3">Please login to book appointment</p>

        {/* FORM */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3"
        >
          {/* Email */}
          <div className="flex flex-col">
            <p>Email:</p>
            <input
              className="border rounded-md pl-3 py-1"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <p>Password:</p>
            <input
              className="border rounded-md pl-3 py-1"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md py-1.5 w-full bg-primary text-white my-3"
            >
              {" "}
              Login{" "}
            </button>
            {error && <div className="text-red-600 mt-2">{error.message}</div>}
          </div>
        </form>

        <p>
          Don't have an account?{" "}
          <span
            className="ml-1 underline text-primary cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
