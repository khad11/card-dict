import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// main layout
import MainLayout from "./layout/MainLayout";

// component
import ErrorPage from "./components/ErrorPage";
import ProtectedRoutes from "./components/Protectedroutes";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Signup setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
