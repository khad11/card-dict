import React, { useRef } from "react";
import { Button } from "../components/ui/button";

// toast
import { ToastContainer, toast } from "react-toastify";

import { Label } from "../components/ui/label";
import { instance } from "../axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  // use ref
  const inputUserName = useRef();
  const inputPassword = useRef(null);

  // navigate
  const navigate = useNavigate();

  //toast
  const notifyError = (message) => toast.error(message);

  //   handle submit  login tugmasi bosilganda ishlaydi
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: inputUserName.current.value,
      password: inputPassword.current.value,
    };
    console.log(userData);

    // axios dan foydalandim
    instance
      .post("/auth/token/", userData)
      .then((data) => {
        const token = data.data.access;
        if (data.status === 200) {
          localStorage.setItem("token", token);
          setUser(token);
          navigate("/");
        } else {
          notifyError();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 uppercase">
          Register
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <input
              id="username"
              name="username"
              placeholder="Enter your name"
              ref={inputUserName}
              autoComplete="userName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <input
              name="password"
              type="password"
              ref={inputPassword}
              autoComplete="new-password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="w-full">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <ToastContainer />
          </div>
        </form>
        <p className="text-center mt-3 text-sm italic">
          {" "}
          if you haven't a accaunt{" "}
          <Link to="/register" className="uppercase opacity-20">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
