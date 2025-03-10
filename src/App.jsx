import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// main layout
import MainLayout from "./layout/MainLayout";

// components
import ErrorPage from "./components/ErrorPage";
import ProtectedRoutes from "./components/Protectedroutes";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setUser(token ? token : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element:
        user === localStorage.getItem("token") ? (
          <Navigate to="/home" />
        ) : (
          <LandingPage />
        ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [{ index: true, element: <Home /> }],
    },
    { path: "/landing", element: <LandingPage /> },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Signup setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
