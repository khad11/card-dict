import React, { useRef } from "react";
import { Button } from "./ui/button";

import { Label } from "./ui/label";
import { instance } from "../axios";

function Signup() {
  const inputUserName = useRef();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputPassword2 = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputUserName.current.value);

    const userData = {
      username: inputUserName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
      password2: inputPassword2.current.value,
    };
    console.log(userData);

    instance
      .post("/user/register/", userData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ``;
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
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              ref={inputEmail}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <input
              name="password2"
              type="password"
              ref={inputPassword2}
              autoComplete="new-password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="w-full">
            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
