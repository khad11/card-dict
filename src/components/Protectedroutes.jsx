import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoutes({ user, children }) {
  if (user) {
    return children;
  }
  return <Navigate to="login" />;
}

export default ProtectedRoutes;
