import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Function to check if a user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Boolean(payload);
  } catch {
    return false;
  }
};

// Function to get user role (optional)
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return "";
  }
};

// ProtectedRoute Component
const ProtectedRoute = ({ role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  console.log("role = ", getUserRole());

  if (role && getUserRole() !== role) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
