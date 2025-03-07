import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Label } from "../components/ui/label";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";

function Signup({ setUser }) {
  // use ref
  const inputUserName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputPassword2 = useRef();

  // navigate {usenavigate}
  const navigate = useNavigate();

  // react tostify
  const notifySuccess = () => toast.success("User Created!");
  const notifyError = (message) => toast.error(message);

  // validatsiya inputlarr uchun
  const validateForm = () => {
    const username = inputUserName.current.value.trim();
    const email = inputEmail.current.value.trim();
    const password = inputPassword.current.value.trim();
    const password2 = inputPassword2.current.value.trim();

    if (!username || !email || !password || !password2) {
      notifyError("Barcha maydonlarni to‘ldiring!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notifyError("Email noto‘g‘ri formatda!");
      return false;
    }

    if (password.length < 8) {
      notifyError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");
      return false;
    }

    if (password !== password2) {
      notifyError("Parollar bir-biriga mos kelmayapti!");
      return false;
    }

    return true;
  };

  // handle submit register tugma bosilganda
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const userData = {
      username: inputUserName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
      password2: inputPassword2.current.value,
    };
    console.log(userData);

    // axios
    instance
      .post("/user/register/", userData)
      .then((data) => {
        console.log(data);
        // const token = data.data.access;
        // localStorage.setItem("token", token);
        // setUser(token);
        navigate("/");
        notifySuccess();
        inputUserName.current.value = "";
        inputEmail.current.value = "";
        inputPassword.current.value = "";
        inputPassword2.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        notifyError("Ro‘yxatdan o‘tishda xatolik yuz berdi!");
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
            <ToastContainer position="top-left" />
          </div>
        </form>
        <p className="text-center mt-3 text-sm italic">
          if you have a accaunt
          <Link to="/login" className="uppercase opacity-20">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
