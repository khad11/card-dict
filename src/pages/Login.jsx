import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { Label } from "../components/ui/label";
import { instance } from "../axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const inputUserName = useRef();
  const inputPassword = useRef(null);
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = inputUserName.current.value.trim();
    const password = inputPassword.current.value.trim();

    if (!username || username.length < 3) {
      notifyError("Username kamida 3 ta harfdan iborat bo‘lishi kerak!");
      return;
    }
    if (!password || password.length < 6) {
      notifyError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");
      return;
    }

    const userData = { username, password };

    instance
      .post("/auth/token/", userData)
      .then((data) => {
        const token = data.data.access;
        if (data.status === 200) {
          localStorage.setItem("token", token);
          setUser(token);
          navigate("/");
        } else {
          notifyError("Noto‘g‘ri foydalanuvchi nomi yoki parol!");
        }
      })
      .catch((error) => {
        notifyError(
          error.response?.data?.detail || "Login failed. Please try again."
        );
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* Login form */}
      <div className="flex flex-col justify-center items-center p-8 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 uppercase">
          Login
        </h2>
        <form className="space-y-5 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            id="username"
            name="username"
            placeholder="Enter your name"
            ref={inputUserName}
            autoComplete="username"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            ref={inputPassword}
            autoComplete="current-password"
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
          <ToastContainer />
        </form>
        <p className="text-center mt-3 text-sm italic">
          Don't have an account?
          <Link to="/register" className="text-red-600 underline ml-2">
            Create an account
          </Link>
        </p>
      </div>

      {/* Image + description */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gray-200 p-10">
        <img
          src="/login.jpg"
          alt="Login Illustration"
          className="w-80 h-80 object-cover"
        />
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold">Log in to your workspace</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email and password to access your iLovePDF account. You
            are one step closer to boosting your document productivity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
