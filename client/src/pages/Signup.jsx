import React from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Auth from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/doctors");
    }
  }, [navigate]);

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(SIGNUP_USER);

  const handleChange = (event) => {
    // update form based on user inputs
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // checking for invalid full name:
    const regex = /^[\p{L}'-]+(?:[\s,.]+[\p{L}'-.]+)+$/u;
    const validFullName = regex.test(formState.fullName.trim());
    if (!validFullName) {
      toast.error("Please enter a valid full name");
      return; // stop submission
    }

    // checking for invalid password:
    const regex2 =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
    const validPassword = regex2.test(formState.password.trim());
    if (!validPassword) {
      toast.error(
        "Please enter a valid password: \n- Minimum 8 characters total \n- At least one lowercase letter \n- At least one uppercase letter \n- At least one number \n- At least one special character"
      );
      return; // stop submition
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // if statement to prevent app from crashing if signup fails and no token is returned:
      if (data?.addUser?.token) {
        setFormState({ fullName: "", email: "", password: "" });
        Auth.login(data.addUser.token);
      } else {
        // if everything seems valid & the form is still wont submit - its because the email is already in use so:
        toast.error("This email is already registered to an account.");
      }
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-slate-800 py-8">
      {/* CONTAINER */}
      <div className="flex flex-col border w-2/3 rounded-lg shadow-md px-10 py-10">
        <p className="font-medium text-2xl mb-1">Signup</p>
        <p className="mb-3">Please signup to book an appointment</p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3"
        >
          {/* full name */}
          <div className="flex flex-col">
            <p>Full Name:</p>
            <input
              className="border rounded-md pl-3 py-1"
              required
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formState.fullName}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className="flex flex-col">
            <p>Email:</p>
            <input
              className="border rounded-md pl-3 py-1"
              required
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className="flex flex-col">
            <p>Password:</p>
            <input
              className="border rounded-md pl-3 py-1"
              required
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="rounded-md py-1.5 bg-primary text-white w-full my-3"
            type="submit"
          >
            {" "}
            Signup
          </button>
          {error && <div className="text-red-600 mt-2">{error.message}</div>}
        </form>
        <p>
          Already have an account?{" "}
          <span
            className="underline text-primary cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
